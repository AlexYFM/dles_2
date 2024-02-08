import {createSlice, current} from '@reduxjs/toolkit'
import {words} from 'popular-english-words'

const letters = {}

const wordList = words.getMostPopularLength(5000, 5) // could modify this to be any length really

for (let i=97; i<=122; i++){
    let cur = {
        seen: false,
        inWord: false,
        inPosition: false
    } 
    letters[String.fromCharCode(i)] = cur
}

//default max guesses should be 6 following original wordle
const initialState = {
    guesses: [],
    numGuesses: 0,
    letters: letters,
    word: '',
    correct: 0
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        newGame: (state) => { //initing or reiniting game
            state.word = String(wordList[Math.floor(Math.random()*5000)])
            state.letters = letters
            state.numGuesses = 0
            state.correct = 0
        },
        guess: (state, action) => { // assuming something else is validing action/input
            state.numGuesses++
            const guess = String(action.payload) // should probably be doing .guess but I'm not really doing too much here
            state.guesses.push(guess) // for display 
            for(let i=0; i<guess.length; i++){
                let letter = guess.charAt(i)
                let known = state.word.charAt(i)
                let inWord = state.word.includes(letter)
                if(letter === known){
                    if (!state.letters[known].seen) state.correct++// if not seen before and we just got it correct
                    state.letters[letter] = {
                        seen: true,
                        inPosition: true,
                        inWord: true
                    }
                } else if(inWord && !state.letters[letter].inPosition){ // don't need to update if we already known
                    state.letters[letter] = {
                        seen: true,
                        inPosition: false,
                        inWord: true
                    }
                } else state.letters[letter] = {...state.letters[letter], seen: true}
            }
            console.log(current(state.letters))
        }
    }
})

export const {newGame, guess} = gameSlice.actions

export default gameSlice.reducer