import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { words } from 'popular-english-words' 
import { useDispatch, useSelector } from 'react-redux'
import { newGame } from './store/gameSlice'
import Letterbox from './components/Letterbox'
import Input from './components/Input'

function App() {
	const dispatch = useDispatch()
	const word = useSelector((state) => state.word) 
	console.log(word)
	useEffect(() => {
		dispatch(newGame())
	}, [])
	return (
		<>
			<h1 className=' text-xl font-bold text-red-500'>{JSON.stringify(word)}</h1>
			<div className={`min-h-screen flex flex-wrap justify-center`}>
				<Letterbox letter='a'/>
				<Letterbox letter='b'/>
				<Letterbox letter='c'/>
				<Input />
			</div>
		</>
	)
}

export default App
