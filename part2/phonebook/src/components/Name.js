import React, { Component } from 'react'

const Name = ({ name }) =>{
    return(
        <li>{name.name} {name.num}</li>
    )
    }

export default Name