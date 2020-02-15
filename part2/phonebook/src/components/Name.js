import React from 'react'

const Name = (props) =>{
    const {persons, newSearch} = props
    const rows = () => persons.filter(p => p.name.toLowerCase().includes(newSearch)).map(person =>
        <li key={person.id}>{person.name}{person.num}</li>)
    return(
        rows()
    )
    }
export default Name