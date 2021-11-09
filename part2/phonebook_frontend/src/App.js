import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import People from './components/People'
import PersonForm from './components/PersonForm'
import services from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ errorMsg, setErrorMsg ] = useState(null)
  const [ successMsg, setSuccessMsg ] = useState(null)

  useEffect(() => {
    services.getPeople()    
      .then(data => {
        console.log(data)
        setPersons(data)
      })
  }, [])

  const filterObject = { state: nameFilter, setter: setNameFilter }
  const nameObject = { state: newName, setter: setNewName }
  const phoneObject = { state: phoneNumber, setter: setPhoneNumber }
  const peopleObject = { state: persons, setter: setPersons }
  const errorObject = {state: errorMsg, setter: setErrorMsg }
  const successObject = {state: successMsg, setter: setSuccessMsg }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMsg} className="error"/>
      <Notification message={successMsg} className="success"/>
      <Filter filter={filterObject}/>
      <h3>Add a new</h3>
      
      <PersonForm 
        name={nameObject}
        number={phoneObject}
        people={peopleObject}
        error={errorObject}
        success={successObject}
      />

      <h3>Numbers</h3>
       <People 
        people={peopleObject} 
        filter={filterObject}
        error={errorObject}
        success={successObject}/>
    </div>
  )
}

export default App
