import React, { useState } from 'react'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number: '040-123456', id: 1},
    { name: 'Ada Lovelace' , number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov' , number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck' , number: '39-23-6423122', id: 4},
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

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
