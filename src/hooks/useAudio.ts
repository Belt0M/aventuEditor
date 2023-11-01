import { useEffect, useState } from 'react'

export const useAudio = (url: string): [boolean, () => void] => {
	const [audio] = useState<HTMLAudioElement>(new Audio(url))
	const [playing, setPlaying] = useState<boolean>(false)

	const toggle = () => {
		console.log('toggle', playing, audio)
		setPlaying(!playing)
	}

	useEffect(() => {
		playing ? audio.play() : audio.pause()
	}, [playing, audio])

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false))
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return [playing, toggle]
}
