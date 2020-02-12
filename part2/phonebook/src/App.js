import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) =>{
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleInputChange = (event) =>{
    setNewName(event.target.value)
    console.log(event.target)
  }

  const rows = () => persons.map(person =>
    <Name name={person}></Name>)

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
