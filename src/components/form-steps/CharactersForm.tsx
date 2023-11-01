import { ChangeEvent, FC, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { BsArrowCounterclockwise, BsPlayFill } from 'react-icons/bs'
import { voicesData } from '../../data/voices.data'
import { useAudio } from '../../hooks/useAudio'
import FormWrapper from '../../layouts/FormWrapper'
import { ICharacter } from '../../types/ICharacter'
import { IStoryForm } from '../../types/IStoryForm'
import CharacterItem from '../CharacterItem'
import InputCharacter from '../InputCharacter'
import SelectOneCharacter from '../SelectOneCharacter'
import TextareaCharacter from '../TextareaCharacter'
import Error from '../popups/Alert'

interface Props {
	characters: ICharacter[]
	updateFields: (fields: Partial<IStoryForm>) => void
	setData: React.Dispatch<React.SetStateAction<IStoryForm>>
	isEdit: boolean
}

const CharactersForm: FC<Props> = ({ characters: data, setData, isEdit }) => {
	const initData = {
		id: 0,
		name: '',
		colorId: '#000000',
		desc: '',
		voice: voicesData[0],
	}

	const [character, setCharacter] = useState<ICharacter>(initData)
	const [characters, setCharacters] = useState<ICharacter[]>(data)
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)
	// Using hook to play actor voice (currently it plays only one song, lately you'll be able to fill voicesData by voice mp3 links, and it must work)
	const [playing, toggle] = useAudio(
		'http://streaming.tdiradio.com:8000/house.mp3'
	)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
		field: string
	) => {
		setCharacter(prev => ({ ...prev, [field]: e.target.value }))
	}

	const handleClick = () => {
		if (character.desc && character.name) {
			setData(prev => ({ ...prev, characters: [...characters, character] }))
			setCharacters([...characters, character])
			setCharacter(initData)
		} else {
			setError(true)
			setTimeout(() => {
				setError(false)
			}, 2000)
		}
	}

	const handleReset = () => {
		setCharacter(initData)
	}

	const handleColorPick = (color: string) => {
		setCharacter(prev => ({ ...prev, colorId: color }))
	}

	const handleDelete = (character: ICharacter) => {
		const filteredArr = characters.filter(el => el.name !== character.name)
		setCharacters(filteredArr)
		setData(prev => ({ ...prev, characters: filteredArr }))
	}

	return (
		<FormWrapper title={`${isEdit ? 'Edit' : 'Add'} characters`}>
			<h3 className='font-bold'>New Character</h3>
			<div className='flex flex-col w-full gap-4 mt-6'>
				<div className='flex flex-col gap-4 lg:gap-12 lg:flex-row'>
					<div className='flex flex-col justify-between w-full lg:w-3/5'>
						<InputCharacter
							label='Name'
							name='name'
							onChange={handleChange}
							placeholder='Type a character name...'
							value={character.name}
							autoFocus={true}
						/>
						<TextareaCharacter
							label='Description'
							name='desc'
							onChange={handleChange}
							placeholder='Type a character description...'
							value={character.desc}
							rows={3}
						/>
					</div>
					<div className='relative flex flex-col justify-between w-full lg:w-2/5'>
						<SelectOneCharacter
							options={voicesData as string[]}
							setCharacter={setCharacter}
							character={character}
							name='voice'
							maxHeight='max-h-44'
							label='Voice'
						/>
						<button
							type='button'
							className='flex items-center gap-1 mb-4 text-sm font-semibold transition-all text-primary hover:brightness-125'
							onClick={toggle}
						>
							<BsPlayFill className='text-2xl' />
							<span>{playing ? 'Stop sample' : 'Play sample'}</span>
						</button>
						<label className='text-xs font-semibold text-dark'>
							Colour ID
							<span className='ml-0.5 text-xs text-darkGray text-opacity-80'>
								(Select colour ID to easily identify your characters)
							</span>
						</label>
						<HexColorInput
							color={character.colorId}
							onChange={handleColorPick}
							className={
								'text-gray-700 flex justify-between items-center w-full px-4 py-[0.42rem] text-sm font-medium  bg-white border-2 border-yellow border-opacity-40 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 focus:border-blue-300 mt-1'
							}
							onClick={() => setIsVisible(prev => !prev)}
						/>
						{isVisible && (
							<div className='fixed'>
								<HexColorPicker
									color={character.colorId}
									onChange={handleColorPick}
								/>
							</div>
						)}
					</div>
				</div>
				<div className='flex items-center gap-8 font-bold'>
					<button
						onClick={handleClick}
						type='button'
						className='px-6 py-2.5 bg-transparent border-2 border-opacity-50 border-darkGreen text-darkGreen rounded-lg text-[.85rem] hover:text-white hover:bg-darkGreen hover:bg-opacity-100 transition-all'
					>
						Add Character
					</button>
					<button
						type='button'
						className='flex items-center gap-1 text-sm transition-all text-darkGray hover:brightness-110'
						onClick={handleReset}
					>
						<BsArrowCounterclockwise className='text-xl -rotate-45' />
						<span>Reset Parameters</span>
					</button>
				</div>
				<div className='grid grid-cols-2 gap-6 pt-6 mt-8 overflow-auto border-t-2 xl:grid-cols-5 min-h-[7.7rem] border-dark border-opacity-30 lg:grid-cols-4 md:grid-cols-3'>
					{characters.map((el, index) => (
						<CharacterItem
							key={el.name}
							data={el}
							index={index}
							handleDelete={handleDelete}
						/>
					))}
				</div>
				{error && <Error error='Error: All fields must be filled!' />}
			</div>
		</FormWrapper>
	)
}

export default CharactersForm
