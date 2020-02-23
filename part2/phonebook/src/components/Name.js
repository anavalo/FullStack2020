import React from 'react'

const Name = (props) =>{
    const {person, remove} = props

    return(
        <li>{person.name} {person.number}
        <button onClick = {remove}>Delete Entry</button>
        </li>
    )
    }
export default Name