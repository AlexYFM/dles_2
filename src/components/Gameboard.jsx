import React, { useEffect, useState } from 'react'
import { newGame } from '../store/gameSlice'
import Input from './Input'
import Letterbox from './Letterbox'
import Popup from './Popup'
import { useSelector } from 'react-redux'


const Gameboard = () => {
    const letters = useSelector(state => state.letters)
    const guesses = useSelector(state => state.guesses)
    const answer = useSelector(state => state.word)
    const numGuesses = useSelector(state => state.numGuesses)
    const [gameover, setGameover] = useState(false) // use this to conditionally render modal
    const [board, setBoard] = useState([[], [], [], [], [], []]) 
    const [win, setWin] = useState(false)
    const [showModal, setShowModal] = useState(false) // there's a better way to do what i'm doing

    useEffect(() => {
        if(!guesses.length) return
        setBoard((prev) => {
            return [...guesses, ...prev.slice(guesses.length)] //this should slowly update board -- slices isn't working properly, but shouldn't matter so long as game is stopped at 6 guesses
        })
        //now check to see if the game is over 
        const last = guesses[guesses.length-1]
        let last_word = ""
        last.map(letter => last_word += letter.char)
        if (last_word===answer){
            setWin(true) // assumes that there will 
            setGameover(true)
            setShowModal(true)
        }
        else if (numGuesses===6){
            setGameover(true)
            setShowModal(true)
        }
        console.log(last_word, answer, win, gameover, showModal)
    }, [guesses])

    return (
        <div className='flex justify-center'>
            {<Popup 
            handleClose={() => setShowModal(false)}
            show={showModal}
            />}
            <div className='inline-block justify-center'>
                {board.map(guess => {
                    const guessComps = []
                    if(guess.length===0){ // checking for blank answer 
                        for(let i=0; i<5; i++){
                            guessComps.push(<Letterbox key={Math.random()} letter={'a'} classNames='text-opacity-0'/>)
                        }
                        return (<div className='w-full justify-center flex' key={Math.random()}>{guessComps}</div>)
                    }
                    //otherwise, guess exists
                    guess.forEach(letter => {
                        let bgColor = 'bg-white'
                        if(letter.seen){
                            if(letter.inPosition) bgColor = 'bg-green-500'
                            else if(letter.inWord) bgColor = 'bg-yellow-500'
                            else bgColor = 'bg-gray-200'
                        }
                        guessComps.push(<Letterbox letter={letter.char} key={Math.random()} bgColor={bgColor}/>)
                    })
                    return (<div className='w-full justify-center flex' key={Math.random()}>{guessComps}</div>)
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