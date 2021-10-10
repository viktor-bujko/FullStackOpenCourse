import React, { useState } from 'react'

const Button = ({ label, clickHandler }) => {
  return <button onClick={ clickHandler }>{label}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))

  const getRandomAnecdote = () => {
    console.log('Current anecdote: ', selected)
    let newSelected = -1
    do {
      newSelected = Math.floor(Math.random() * 10)
    } while(newSelected < 0 || newSelected >= anecdotes.length)
    setSelected(newSelected)
    console.log('Set new anecdote to: ', newSelected)
  }

  const setAnecdoteVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1

    console.log('Updated votes count: ', votesCopy)
    setVotes(votesCopy)
  }

  const getAnecdoteVoteCount = () => votes[selected]

  const getMostVotedAnecdote = () => {
    let votesCopy = votes.slice()
    let maxVotesIdx = votesCopy.indexOf(Math.max(...votesCopy))   

    console.log('Most voted index: ', maxVotesIdx)
    return anecdotes[maxVotesIdx]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>This anecdote has {getAnecdoteVoteCount()} votes.</p>
      <div>
        <Button label='vote' clickHandler={setAnecdoteVote}/>
        <Button label='next anecdote' clickHandler={getRandomAnecdote}/>
      </div>
      <h1>Anecdote with most votes</h1>
      {getMostVotedAnecdote()}
    </div>
  )
}

export default App