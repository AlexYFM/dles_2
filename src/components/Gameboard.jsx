import React, { useEffect, useState } from 'react'
import { newGame, guess } from '../store/gameSlice'
import Input from './Input'
import Letterbox from './Letterbox'
import { useSelector } from 'react-redux'


const Gameboard = () => {
    const letters = useSelector(state => state.letters)
    const guesses = useSelector(state => state.guesses)
    const [board, setBoard] = useState([{}, {}, {}, {}, {}, {}]) 

    useEffect(() => {
        setBoard((prev) => {
            console.log([...guesses, ...prev.slice(guesses.length)])
            return [...guesses, ...prev.slice(guesses.length)] //this should slowly update board
        })
    }, [guesses])

    return (
        <div className='flex justify-center'>
            <div className='inline-block justify-center'>
                {board.map(guess => {
                    const guessComps = []
                    if(Object.keys(guess).length===0){ // checking for blank answer 
                        for(let i=0; i<5; i++){
                            guessComps.push(<Letterbox key={Math.random()}/>)
                        }
                        return (<div className='w-full justify-center flex'>{guessComps}</div>)
                    }
                    //otherwise, guess exists
                    for (let letter in guess){
                        let bgColor = 'bg-white'
                        if(guess[letter].seen){
                            if(guess[letter].inPosition) bgColor = 'bg-green-500'
                            else if(guess[letter].inWord) bgColor = 'bg-yellow-500'
                            else bgColor = 'bg-gray-200'
                        }
                        guessComps.push(<Letterbox letter={letter} key={Math.random()} bgColor={bgColor}/>)
                    }
                    return (<div className='w-full justify-center flex'>{guessComps}</div>)
                    Object.entries(guess).map((letter) => {
                        let bgColor = 'bg-white'
                        if(letter[1].seen){
                            if(letter[1].inPosition) bgColor = 'bg-green-500'
                            else if(letter[1].inWord) bgColor = 'bg-yellow-500'
                            else bgColor = 'bg-gray-200'
                        }
                        return (<Letterbox letter={letter[0]} key={Math.random()} bgColor={bgColor}/>)
                    })
                }
                )}
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