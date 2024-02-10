import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { newGame } from '../store/gameSlice'

const RestartButton = ({classnames = "", ...props}) => {
	const guesses = useSelector(state => state.guesses)
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(newGame())
	}
	
    return (
		<Button
		onClick={handleClick}
		className={` ${classnames}`}>
			↺
		</Button>
	)
}

export default RestartButton