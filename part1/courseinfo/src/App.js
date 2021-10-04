import React from 'react'

const Header = (c) => (
  <>
  <h1>{c.courseName}</h1>
  </>
)

const Part = (part) => (
  <>
    <p>
      {part.title} {part.exerCount}
    </p>
  </>
)

const Content = (parts) => {
  return (
    <div>
      <Part title={parts.p1} exerCount={parts.e1}/>
      <Part title={parts.p2} exerCount={parts.e2}/>
      <Part title={parts.p3} exerCount={parts.e3}/>
    </div>
  )
}

const Total = (exercises) => (
  <p>Number of exercises {exercises.e1 + exercises.e2 + exercises.e3}</p>
)

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course}/>
      <Content p1={part1} p2={part2} p3={part3} e1={exercises1} e2={exercises2} e3={exercises3}/>
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </div>
  )
}

export default App