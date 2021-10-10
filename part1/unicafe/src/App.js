import React, { useState } from 'react'

const Button = ({ clickHandle, label }) => {

  return (
    <button onClick={clickHandle}>
      {label}
    </button>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}: {value}</td>
  </tr>
)

const TableBody = ({ feedbacks, all }) => {

  const values = feedbacks.values
  const weights = feedbacks.weights
  const labels = feedbacks.labels

  function weightedAvg() {

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

  let result = []

  const positiveRate = () => values[0] * 100 / all + ' %'

  for (let i = 0; i < values.length; i++) {
    result.push(<StatisticLine key={labels[i]} text={labels[i]} value={values[i]}/>)
  }
  result.push(<StatisticLine key='all' text='All' value={all}/>)
  result.push(<StatisticLine key='avg' text='Average' value={weightedAvg()}/>)
  result.push(<StatisticLine key='pos' text='Positive' value={positiveRate()}/>)

  return result
}

const Statistics = ({ feedbacks }) => {

  let all = 0
  feedbacks.values.forEach(value => all += value)

  function getStatisticsTable() {

    if (all === 0) return ['No feedback given']
    
    return (
      <table key={"statsTable"}>
        <tbody key={"key2"}>
          <TableBody feedbacks={feedbacks} all={all}/>
        </tbody>
      </table>
    )
  }
  
  return (
    <>
      <h2>Statistics</h2>
      {getStatisticsTable()}
    </>
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

  const goodLabel = 'Good'
  const neutralLabel = 'Neutral'
  const badLabel = 'Bad'

  const feedbacks = {
    values: [good, neutral, bad],
    weights: [1, 0, -1],
    labels: [goodLabel, neutralLabel, badLabel]
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button clickHandle={setGoodFeedback} label={goodLabel}/>
      <Button clickHandle={setNeutralFeedback} label={neutralLabel}/>
      <Button clickHandle={setBadFeedback} label={badLabel}/>
      <Statistics feedbacks={feedbacks}/>
    </>
  )
}

export default App