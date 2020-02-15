import React from 'react'

const Filter = (props)=>{
  const {newSearch, handleSearchChange} = props

    return (
<form>
<div>filter:
  <input value={newSearch} onChange={handleSearchChange}></input>
</div>
</form>
    );
}

export default Filter