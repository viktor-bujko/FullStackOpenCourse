
const Total = ({ parts }) => {
    console.log(parts)

    let exercises = parts.map(part => part.exercises)

    let total = exercises.reduce((acc, current) => {
      console.log('Prev: ', acc, '\nPart: ', current, "\nSum: ", acc + current)
      return acc + current
    })

    return(
      <p>
        <strong>Total of {total} exercises.</strong>
      </p>
    ) 
}

export default Total
