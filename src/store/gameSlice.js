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
    guesses: [], // each guess should be an object that stores what the letter was at that instant
    numGuesses: 0,
    letters: letters,
    word: '',
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        newGame: (state) => { //initing or reiniting game
            state.word = String(wordList[Math.floor(Math.random()*5000)])
            state.letters = letters
            state.numGuesses = 0
        },
        guess: (state, action) => { // assuming something else is validing action/input
            state.numGuesses++
            const guess = String(action.payload) // should probably be doing .guess but I'm not really doing too much here
            // state.guesses.push(guess) // for display -- wrong fix later
            const review = {} // should be storing letters here
            for(let i=0; i<guess.length; i++){
                let letter = guess.charAt(i)
                let known = state.word.charAt(i)
                let inWord = state.word.includes(letter)
                if(letter === known){
                    state.letters[letter] = {
                        seen: true,
                        inPosition: true,
                        inWord: true
                    }
                    review[letter] = state.letters[letter]
                } else if(inWord){ 
                    // the guess needs to be updated independant of the board
                    review[letter] = {
                        seen: true,
                        inPosition: false,
                        inWord: true
                    }
                    // don't need to update if we already known
                    if(!state.letters[letter].inPosition){
                        state.letters[letter] = {
                            seen: true,
                            inPosition: false,
                            inWord: true
                        }
                    }
                } else{
                    review[letter] = {
                        seen: true,
                        inPosition: false,
                        inWord: false
                    }
                    state.letters[letter] = {...state.letters[letter], seen: true}
                }
            }
            state.guesses.push(review)
        }
    }
})

export const {newGame, guess} = gameSlice.actions

export default gameSlice.reducer