import React from 'react'
import { newGame, guess } from '../store/gameSlice'
import Input from './Input'
import Letterbox from './Letterbox'
import { useSelector } from 'react-redux'


const Gameboard = () => {
    const letters = useSelector(state => state.letters)
    const guesses = useSelector(state => state.guesses)

    return (
        <div className='flex justify-center'>
            <div className='flex justify-center'>
                
            </div>
            <div className='flex w-10/12 rounded-lg shadow-sm border border-black flex-wrap absolute bottom-0'>
                    <Input />
                    <div className='flex justify-center flex-wrap mt-4'>
                        {Object.entries(letters).map((letter) => {
                            let bgColor = 'bg-white'
                            if(letter[1].seen){
                                if(letter[1].inPosition) bgColor = 'bg-green-500'
                                else if(letter[1].inWord) bgColor = 'bg-yellow-500'
                                else bgColor = 'bg-gray-200'
                            }
                            return ( //0th index is letter, 1st is properties
                            <Letterbox letter={letter[0]} key={letter[0]} bgColor={bgColor}/>
                        )})}
                    </div>
            </div>
        </div>
    )
}

export default Gameboard