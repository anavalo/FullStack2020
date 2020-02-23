import React, {useState, useEffect} from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import nameService from './services/persons'

const App = () => {

  const [ newSearch, setNewSearch] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ persons, setPersons] = useState([])

  useEffect(()=>{
    nameService
    .getAll()
    .then(initialNames => setPersons(initialNames))
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
      number: newNum,
    }

    nameService
    .create(nameObject)
    .then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNum('')
    })
  }

  const eliminate = (id) =>{
    const newJson = persons.filter(p => p.id !== id)

    nameService
    .elim(id)
    .then(
      setPersons(newJson)
    )
  }

  
  const handleSearchChange = (event)=>{
    setNewSearch(event.target.value)
  }

  const rows = () => persons.filter(p => p.name.toLowerCase().includes(newSearch)).map(person =>
    <Name key = {person.id} 
    person={person}
    remove = {() => eliminate(person.id)}></Name>)

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
      {rows()}
    </div>
  )
}

export default App
