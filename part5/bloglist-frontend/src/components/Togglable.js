import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible? 'none' : '',
  }

  const showWhenVisible = {
    display: visible ? '' : 'none',
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
    <>
      <div style={hideWhenVisible}>
        {props.childrenWhenHide}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.closeLabel}</button>
      </div>
    </>
  )

}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired
}

export default Togglable