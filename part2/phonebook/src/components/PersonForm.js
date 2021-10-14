const PersonForm = ({ name, phone, people}) => {

    const newName = name.state
    const persons = people.state
    const phoneNumber = phone.state
    const setPersons = people.setter
    const setNewName = name.setter
    const setPhoneNumber = phone.setter

    const addPersonToPhoneBook = (event) => {
        event.preventDefault()
    
        if (newName.length === 0 || phoneNumber.length === 0) {
            alert('Please, enter both the name and the phone number')
            return
        }
    
        let userWithNameNotExists = persons.find(person => person.name === newName) !== undefined
    
        if (userWithNameNotExists) {
          alert(`${newName} is already added to phonebook`)
          return
        }
    
        console.log('Adding ', {newName}, ' to the phonebook.')
        setPersons(
          persons.concat({ 
            id: persons.length + 1,
            name: newName,
            number: phoneNumber
          })
        )
        setNewName('')
        setPhoneNumber('')
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
            <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
