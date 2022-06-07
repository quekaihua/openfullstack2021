import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import React from 'react'
const AnecdoteForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote
}

const connectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedForm
