import React from 'react'

const Header = (c) => <h1>{c.course.name}</h1>

const Part = (props) => (
    <p>
      {props.p.name} {props.p.exercises}
    </p>
)

const Content = (props) => (
    <div>
    {props.course.parts.map(part =><Part key={part.name} p={part}/>)}
    </div>
  )

const Total = (props) => {
  let sum = 0
  props.course.parts.forEach(part => sum += part.exercises);
  return <p>Number of exercises {sum}</p>
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App