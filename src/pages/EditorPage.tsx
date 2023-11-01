/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragEvent, FC, useCallback, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, {
	Edge,
	Node,
	NodeTypes,
	OnConnect,
	ReactFlowInstance,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
} from 'reactflow'
import { storiesApi } from '../services/stories.api'

import 'reactflow/dist/style.css'
import SmthWrong from '../components/SmthWrong'
import StoryFlowLoader from '../components/loaders/StoryFlowLoader'
import Alert from '../components/popups/Alert'
import SideAlert from '../components/popups/SideAlert'
import FlowCharacter from '../flow/FlowCharacter'
import SidePanel from '../flow/SidePanel'
import TopPanel from '../flow/TopPanel'
import DecisionModal from '../flow/modals/DecisionModal'
import NarrativeModal from '../flow/modals/NarrativeModal'
import CharacterNode from '../flow/nodes/CharacterNode'
import DecisionNode from '../flow/nodes/DecisionNode'
import EndNode from '../flow/nodes/EndNode'
import NarrativeNode from '../flow/nodes/NarrativeNode'
import StartNode from '../flow/nodes/StartNode'
import { IEdge } from '../types/IEdge'
import { INode } from '../types/INode'

let id = 0
const getId = () => `${id++}`

const EditorPage: FC = () => {
	const { id: storyId } = useParams()
	const {
		data: story,
		error: getStoryError,
		isLoading: getStoryLoading,
	} = storiesApi.useGetOneExtendedStoryQuery(storyId!)
	const [createNode, { error: nodeError, isSuccess: nodeSuccess }] =
		storiesApi.useCreateNodeMutation()
	const [createEdge] = storiesApi.useCreateEdgeMutation()

	// React flow logic
	const nodeTypes: NodeTypes = useMemo(
		() => ({
			startNode: StartNode,
			decisionNode: DecisionNode,
			narrativeNode: NarrativeNode,
			endNode: EndNode,
			characterNode: CharacterNode,
		}),
		[]
	)

	const reactFlowWrapper = useRef<HTMLDivElement | null>(null)!
	const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([])
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
		any,
		any
	> | null>(null)!
	const [modalType, setModalType] = useState<string>('')
	const [activeNodeId, setActiveNodeId] = useState<number | null>(null)

	// Nodes connection function
	const onConnect: OnConnect = useCallback(
		connection => {
			setEdges(eds => addEdge(connection, eds))
			const { source, sourceHandle, target } = connection
			// Create Edge object to send in request body
			const edge: IEdge = {
				id: sourceHandle
					? `edge-${source}-(${sourceHandle})-${target}`
					: `edge-${source}-${target}`,
				source: source!,
				target: target!,
				sourceHandle: sourceHandle ? sourceHandle : null,
			}
			// PATCH request
			createEdge({ edge, storyId: parseInt(storyId!) })
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[setEdges]
	)

	// Soon..
	// // Restore nodes from fetched story when page is loaded or show empty canvas
	// const onRestore = useCallback(() => {
	// 	const fetchedNodes = story?.nodes
	// 	const fetchedEdges = story?.edges
	// 	console.log(story)
	// 	if (fetchedNodes) {
	// 		const formattedNodes: Node[] = fetchedNodes.map(node => ({
	// 			id: node.id,
	// 			position: { x: node.positionX, y: node.positionY },
	// 			type: node.type,
	// 			data: node.data,
	// 		}))
	// 		console.log(formattedNodes, fetchedEdges)
	// 		setNodes(formattedNodes)
	// 		console.log(nodes)
	// 		fetchedEdges && setEdges(fetchedEdges)
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [setNodes, story])

	// // Call onRestore function after page is loaded and story is fetched
	// useEffect(() => {
	// 	onRestore()
	// }, [onRestore])

	//  Drag and drop new nodes logic
	const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move'
		}
	}, [])

	const onDrop = useCallback(
		(event: DragEvent<HTMLDivElement>) => {
			event.preventDefault()

			const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect()
			if (event.dataTransfer) {
				const type = event.dataTransfer.getData('application/reactflow')
				let character
				const data = event.dataTransfer.getData('characterData')
				if (data) {
					character = JSON.parse(data)
				}

				// check if the dropped element is valid
				if (typeof type === 'undefined' || !type) {
					return
				}

				const position = reactFlowInstance!.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				})
				const newNode: Node = {
					id: getId(),
					type,
					position,
					data: {
						label: `${type} node`,
						characters: character && [{ ...character }],
					},
				}

				// Formatting Node object to send in request body
				const formattedNode: INode = {
					id: newNode.id,
					positionX: newNode.position.x,
					positionY: newNode.position.y,
					type: newNode.type!,
					data: {
						label: newNode.data.label,
						characters: character ? newNode.data.characters : [],
					},
				}
				// PATCH request
				createNode({ id: parseInt(storyId!), node: formattedNode })
				setNodes(nds => nds.concat(newNode))
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[reactFlowInstance]
	)

	// Handle open modal on node click
	const handleNodeClick = useCallback(
		(_event: React.MouseEvent, node: Node) => {
			if (node.type) {
				setModalType(node.type)
				setActiveNodeId(parseInt(node.id))
			}
		},
		[]
	)

	return (
		<main className='px-16 py-5 bg-[#fff]'>
			{getStoryLoading || getStoryError ? (
				<StoryFlowLoader />
			) : (
				<div className='flex h-[14.5rem] gap-4 p-3 bg-white shadow-storyShadow'>
					<img
						src={story?.cover}
						alt={story?.title}
						className='h-full aspect-square rounded-2xl'
					/>
					<div className='w-full'>
						<h1 className='mb-4 text-2xl font-bold '>{story?.title}</h1>
						<span className='text-sm font-semibold'>Characters</span>
						<div className='grid grid-cols-1 gap-4 mt-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-3/5'>
							{story?.characters?.map((el, index) => (
								<FlowCharacter
									data={el}
									index={index}
									key={index}
									isColor={true}
									// minWidth='min-w-[12rem]'
								/>
							))}
						</div>
					</div>
				</div>
			)}

			{/* "React Flow Canvas init" */}
			{getStoryLoading ? (
				''
			) : getStoryError ? (
				<SmthWrong />
			) : (
				<ReactFlowProvider>
					<div
						className='relative w-full h-[22.5rem] mt-8'
						ref={reactFlowWrapper}
					>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							nodeTypes={nodeTypes}
							onDrop={onDrop}
							onDragOver={onDragOver}
							onInit={setReactFlowInstance}
							onNodeClick={handleNodeClick}
						/>
						<SidePanel />
						<TopPanel />
					</div>
				</ReactFlowProvider>
			)}

			{/* Open the modal depending on clicked node type*/}
			{modalType === 'decisionNode' && (
				<DecisionModal
					setModalType={setModalType}
					nodeId={activeNodeId!}
					storyId={storyId!}
				/>
			)}
			{modalType === 'narrativeNode' && (
				<NarrativeModal
					setModalType={setModalType}
					nodeId={activeNodeId!}
					storyId={storyId!}
				/>
			)}
			{modalType === 'characterNode' && (
				<NarrativeModal
					setModalType={setModalType}
					nodeId={activeNodeId!}
					storyId={storyId!}
				/>
			)}

			{/* Requests response handling */}
			{getStoryError && <Alert error="Error: Can't load the story!" />}
			{nodeError && <SideAlert error="Error: Can't create the node!" />}
			{nodeSuccess && (
				<SideAlert
					error='Success: Node was successfully created!'
					type='success'
				/>
			)}
		</main>
	)
}

export default EditorPage
