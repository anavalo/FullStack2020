import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons] = useState([{name: 'Arto Hellas', id:1}]) 
  const [ newName, setNewName ] = useState('')

  const handleInputChange = (event) =>{
    (Object.values(persons).some(d => d.name === event.target.value))?
     window.alert(`${event.target.value} is already in the Phonebook`)
      : //pass
    setNewName(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length+1
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
   
  }
 
  const rows = () => persons.map(person =>
    <Name name={person} key={person.id}></Name>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name:
          <input value={newName} onChange={handleInputChange}>
          </input>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>{rows()}</div>
    </div>
  )
}

export default App
