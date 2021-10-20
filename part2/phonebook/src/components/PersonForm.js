import services from '../services/persons'

const PersonForm = ({ name, phone, people }) => {

    const newName = name.state
    const persons = people.state
    const phoneNumber = phone.state
    const setPersons = people.setter
    const setNewName = name.setter
    const setPhoneNumber = phone.setter

    const setNewPhoneNumber = () => {
      const idx = persons.findIndex(person => person.name === newName)

      const msg = `${persons[idx].name} is already added to phonebook, replace the old number with a new one?`

      if (!window.confirm(msg)) return
      
      let updatedPerson = { ...persons[idx], number: phoneNumber }

      services.updatePerson(updatedPerson.id, updatedPerson)
        .then(data => {
          console.log(data)
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : data))
          setNewName('')
          setPhoneNumber('')
        })
        .catch(_ => {
          alert('Tried to update non-existing person! Try again.')
        })

    }

    const addPersonToPhoneBook = (event) => {
        event.preventDefault()
    
        if (newName.length === 0 || phoneNumber.length === 0) {
            alert('Please, enter both the name and the phone number')
            return
        }
    
        let userWithNameNotExists = persons.find(person => person.name === newName) !== undefined
    
        if (userWithNameNotExists) {
          setNewPhoneNumber()
          return
        }
    
        console.log('Adding ', {newName}, ' to the phonebook.')
        const newPerson = { 
          name: newName,
          number: phoneNumber
        }

        services
          .createPerson(newPerson)
          .then(data => {
            console.log(data)
            setPersons(persons.concat(newPerson))
            setNewName('')
            setPhoneNumber('')
          })
    }

    const nameChangeHandler = (event) => {
        let name = event.target.value
        console.log('Current input state: ', name)
        setNewName(name)
    }
    
    const phoneNumberHandler = (event) => {
        const phoneNumber = event.target.value
        console.log('Current phone number: ', phoneNumber)
        setPhoneNumber(phoneNumber)
    }
    

    return (
      <form onSubmit={addPersonToPhoneBook}>
        <div>
          name: <input 
                  onChange={nameChangeHandler} 
                  value={newName}
                />
        </div>
        <div>
          number: <input
                    onChange={phoneNumberHandler}
                    value={phoneNumber}  
                  />
        </div>
        <div>
            <button type="submit">Add new person</button>
        </div>
      </form>
    )
}

export default PersonForm
