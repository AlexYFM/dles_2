import React, { useEffect, useState } from 'react'
import { guess } from '../store/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

const Input = () => {
    const [wordGuess, setWordGuess] = useState("")
    const numGuesses = useSelector((state) => state.numGuesses)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const pattern = /^[a-zA-Z]+$/ // input validiation
        if (wordGuess.length===5 && pattern.test(wordGuess)){
            dispatch(guess(wordGuess))
            setWordGuess('')
        }       
        return
    }

    //below is just for debugging
    useEffect(() => {
        console.log(wordGuess)
        console.log(numGuesses)
    }, [wordGuess])

    return (
    <form onSubmit={handleSubmit} className='flex w-full h-1/6'>
            <input 
            type="text"
            value={wordGuess}
            placeholder='Guess the word'
            onChange={(e) => setWordGuess(e.target.value)} 
            className='w-full rounded-tl-lg px-3 py-1.5 border text-black bg-slate-300'
            />
            <button type="submit"
            className='rounded-tr-lg px-3 bg-gray-600'>
                ↑
            </button>
        </form>
    )
}

export default Input