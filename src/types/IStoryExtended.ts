/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEdge } from './IEdge'
import { INode } from './INode'
import { IStory } from './IStory'

export interface IStoryExtended extends IStory {
	nodes: INode[]
	edges: IEdge[]
}
