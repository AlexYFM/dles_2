import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { words } from 'popular-english-words' 
import { useDispatch, useSelector } from 'react-redux'
import { newGame } from './store/gameSlice'
import Gameboard from './components/Gameboard'

function App() {
	const dispatch = useDispatch()
	const word = useSelector((state) => state.word) 
	useEffect(() => {
		dispatch(newGame())
	}, [])
	return (
		<>
			<div className={`flex flex-wrap justify-center`}>
				<Gameboard />
			</div>
		</>
	)
}

export default App
