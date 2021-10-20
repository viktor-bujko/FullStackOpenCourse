import services from '../services/persons'
import { timeout } from './PersonForm'

const People = ({ people, filter, success, error }) => {

    const nameFilter = filter.state
    let persons = people.state

    const deletePerson = (person) => {
      if (! window.confirm(`Delete ${person.name} from the phonebook?`)) return

      services
        .deletePerson(person.id)
        .then(_ => {
          const newPersons = persons.filter(p => p.id !== person.id)
          success.setter(`${person.name} has been deleted successfully.`)
          people.setter(newPersons)
          setTimeout(
            () => success.setter(null),
            timeout
          )
        })
        .catch(() => {
          error.setter(`Something went wrong while deleting ${person.name}.`)
          setTimeout(
            () => error.setter(null),
            timeout
          )
        })
    }

    let peopleToShow = persons.filter(
            person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase())
    )

    if (peopleToShow.length === 0) return <div>No people to show.</div>
  
    return (
      peopleToShow.map( 
        person => {
          let spaceIdx = person.name.indexOf(' ')

          spaceIdx = (spaceIdx === -1) 
                          ? person.name.length 
                          : spaceIdx

          return (
            <div key={person.id} className="person">
              {`${person.name} ${person.number} `}
              <button onClick={() => deletePerson(person)}>
                Delete {person.name.slice(0, spaceIdx)}
              </button>
            </div>
          )
        }
      )
    )
}

export default People