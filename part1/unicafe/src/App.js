import React, { useState } from 'react'

const Button = ({ clickHandle, label }) => {

  return (
    <button onClick={clickHandle}>
      {label}
    </button>
  )
}

const Stats = ({ label, value}) => {
  return (
    <div>
      {label}: {value}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedback = () => { 
    console.log('good value before setting', good)
    setGood(good + 1) 
  }
  const setNeutralFeedback = () => { 
    console.log('neutral value before setting', neutral)
    setNeutral(neutral + 1) 
  }
  const setBadFeedback = () => { 
    console.log('bad value before setting', bad)
    setBad(bad + 1) 
  }

  const weightedAvg = ({ values, weights }) => {

    let sum = 0

    if (values.length === weights.length) {
      let scores = values.map((_, i) => values[i] * weights[i])
      scores.forEach(value => sum += value)
    
      return all === 0 
                ? 0 
                : sum / all

    } else {
      console.log('Lenghts of arrays are not equal.')
      return Number.NaN
    }
  }

  const goodLabel = 'Good'
  const neutralLabel = 'Neutral'
  const badLabel = 'Bad'
  const allLabel = 'All'
  const avgLabel = 'Average'
  const positiveLabel = 'Positive'

  const all = good + neutral + bad
  const positivePercent = all === 0 ? 0 : (good * 100) / all + ' %'
  const avg = weightedAvg({
    values: [good, neutral, bad],
    weights: [1, 0, -1]
  })
  
  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandle={setGoodFeedback} label={goodLabel}/>
      <Button clickHandle={setNeutralFeedback} label={neutralLabel}/>
      <Button clickHandle={setBadFeedback} label={badLabel}/>
      <h2>Statistics</h2>
      <Stats label={goodLabel} value={good}/>
      <Stats label={neutralLabel} value={neutral}/>
      <Stats label={badLabel} value={bad}/>
      <Stats label={allLabel} value={all}/>
      <Stats label={avgLabel} value={avg}/>
      <Stats label={positiveLabel} value={positivePercent}/>
    </div>
  )
}

export default App