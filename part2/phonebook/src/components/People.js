import services from '../services/persons'

const People = ({ people, filter }) => {

    const nameFilter = filter.state
    let persons = people.state
    const peopleSetter = people.setter

    let peopleToShow = persons.filter(
            person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase())
    )

    const deletePerson = (person) => {
      if (! window.confirm(`Delete ${person.name} from the phonebook?`)) return

      services
        .deletePerson(person.id)
        .then(_ => {
          const newPersons = persons.filter(p => p.id !== person.id)
          peopleSetter(newPersons)
        })
    }


    if (peopleToShow.length === 0) return <div>No people to show.</div>
  
    return (
      peopleToShow.map( 
        person => 
          <div key={person.id}>
            {`${person.name} ${person.number} `}
            <button onClick={() => deletePerson(person)}>Delete {person.name.slice(0, person.name.indexOf(' '))}</button>
          </div>
      )
    )
}

export default People