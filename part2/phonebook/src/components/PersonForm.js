import services from '../services/persons'

export const timeout = 3000

const PersonForm = ({ name, number, people, error, success }) => {

    const newName = name.state
    const persons = people.state
    const phoneNumber = number.state
    const nameSetter = name.setter

    const setNewPhoneNumber = () => {
      const idx = persons.findIndex(person => person.name === newName)

      const msg = `${persons[idx].name} is already added to phonebook. Replace the old number with a new one?`

      if (!window.confirm(msg)) return
      
      let updatedPerson = { ...persons[idx], number: phoneNumber }
      console.log('UPDATE: ', updatedPerson)

      services.updatePerson(updatedPerson.id, updatedPerson)
        .then(data => {
          console.log(data)
          people.setter(persons.map(person => person.id !== updatedPerson.id ? person : data))
          nameSetter('')
          number.setter('')
          success.setter(`${updatedPerson.name}'s number has been updated successfully.`)
          setTimeout(
            () => success.setter(null), 
            timeout
          )
        })
        .catch(_ => {
          error.setter(`Something went wrong during ${updatedPerson.name}'s phone number modification!`)
          setTimeout(() => {
            error.setter(null)
          }, timeout)
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
          .createPerson(newPerson)  // newPerson must NOT be used below -> id is missing - use 'data' instead
          .then(data => {
            console.log('Added: ', data)
            people.setter(persons.concat(data))
            success.setter(`${newName} has been added to the phonebook.`)
            setTimeout(
              () => success.setter(null),
              timeout
            )
            nameSetter('')
            number.setter('')
          })
          .catch(() => {
            error.setter(`Something went wrong while adding ${newPerson.name} to the phonebook.`)
            setTimeout(
              () => error.setter(null),
              timeout
            )
          })
    }

    const nameChangeHandler = (event) => {
        let name = event.target.value
        console.log('Current input state: ', name)
        nameSetter(name)
    }
    
    const phoneNumberHandler = (event) => {
        const phoneNumber = event.target.value
        console.log('Current phone number: ', phoneNumber)
        number.setter(phoneNumber)
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
