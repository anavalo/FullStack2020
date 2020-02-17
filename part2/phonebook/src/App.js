import React, {useState, useEffect} from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {

  const [ newSearch, setNewSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ persons, setPersons] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{setPersons(response.data)})
  }, [])

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
