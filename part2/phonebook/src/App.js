import React, {useState} from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {

  const [ newSearch, setNewSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', num: '040-123456', id: 1 },
    { name: 'Ada Lovelace', num: '39-44-5323523', id:2 },
    { name: 'Dan Abramov', num: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', num: '39-23-6423122', id:4 }
  ])

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

  const handleSearchChange = (event)=>{
    setNewSearch(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

        <Filter 
        newSearch={newSearch} 
        handleSearchChange={handleSearchChange}/>

      <h3>add a new</h3>

        <PersonForm 
        newNum = {newNum} 
        addName={addName} 
        newName={newName} 
        handleInputChange={handleInputChange} 
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

        <Name persons={persons} 
        newSearch={newSearch}/>

    </div>
  )
}

export default App
