import React from 'react'
 
const PersonForm = (props)=>{

    const {addName, newName, handleInputChange, handleNumberChange, newNum} = props

return(
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
)
}
 
export default PersonForm 