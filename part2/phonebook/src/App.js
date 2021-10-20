import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'
import services from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    services.getPeople()    
      .then( data => setPersons(data))
  }, [])

  const filterObject = { state: nameFilter, setter: setNameFilter }
  const nameObject = { state: newName, setter: setNewName }
  const phoneObject = { state: phoneNumber, setter: setPhoneNumber }
  const peopleObject = { state: persons, setter: setPersons }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterObject}/>
      <h3>Add a new</h3>
      
      <PersonForm 
        name={nameObject}
        phone={phoneObject}
        people={peopleObject}
      />

      <h3>Numbers</h3>
       <People people={peopleObject} filter={filterObject}/>
    </div>
  )
}

export default App
