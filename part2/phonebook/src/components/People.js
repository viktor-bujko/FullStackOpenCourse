const People = ({ people, filter }) => {

    const nameFilter = filter.state
    let persons = people.state

    let peopleToShow = persons.filter(
            person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase())
    )

    if (peopleToShow.length === 0) return <div>No people to show.</div>
  
    return (
      peopleToShow.map( 
        person => <div key={person.id}>{person.name} {person.number}</div>
      )
    )
}

export default People