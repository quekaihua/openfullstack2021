import { createSlice } from '@reduxjs/toolkit'

import service from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAction(state, action) {
      const { id } = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) =>  b.votes-a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await service.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await service.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await service.vote(anecdote)
    dispatch(voteAction(newAnecdote))
  }
}

export default anecdoteSlice.reducer
