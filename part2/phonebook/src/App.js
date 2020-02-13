import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons] = useState([{name: 'Arto Hellas', id:1, num: parseInt('040123554')}]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')

  const handleInputChange = (event) =>{
    (Object.values(persons).some(d => d.name === event.target.value))?
     window.alert(`${event.target.value} is already in the Phonebook`)
      : //pass
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNum(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length+1,
      num: newNum
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNum('')
   
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
          <div>number:
            <input value={newNum} onChange={handleNumberChange}></input>
          </div>
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>{rows()}</div>
    </div>
  )
}

export default App
