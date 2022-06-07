import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import React, { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const notification = useSelector((state) => state.notification)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification !== '' && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
