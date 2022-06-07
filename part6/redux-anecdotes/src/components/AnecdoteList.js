import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import React from 'react'

const AnecdotesList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted ${anecdote.content}`, 3)
  }

  return props.anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ))
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return { anecdotes: state.anecdotes }
  } else {
    return { anecdotes: (state.anecdotes.filter(n => n.content.indexOf(state.filter) !== -1)) }
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdotesList)

export default ConnectedAnecdotes
