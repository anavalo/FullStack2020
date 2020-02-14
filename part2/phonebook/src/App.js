import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456' },
    { name: 'Ada Lovelace', num: '39-44-5323523' },
    { name: 'Dan Abramov', num: '12-43-234345' },
    { name: 'Mary Poppendieck', num: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  const handleInputChange = (event) =>{
    (Object.values(persons).some(d => d.name === event.target.value))?
     window.alert(`${event.target.value} is already in the Phonebook`)
      : //pass
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event)=>{
    setNewSearch(event.target.value)
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
 
  const rows = () => persons.filter(p => p.name.toLowerCase().includes(newSearch)).map(person =>
    <Name name={person} key={person.id}></Name>)

  // const rowss = () => Object.values(persons).filter(person => person.includes(newSearch))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter:
          <input value={newSearch} onChange={handleSearchChange}></input>
        </div>
      </form>
      <h2>add a new</h2>
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
