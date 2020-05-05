
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  const  blog = {
    author: 'Test author',
    title: 'Test title',
    likes:0,
    url: 'www.testing.com'
  }

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show..." childrenWhenHide1={blog.title} childrenWhenHide2={blog.author}>
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('at start only title and author are shown', () => {
    const div = component.container.querySelector('.nonTogglableContent')
    expect(div).toHaveTextContent('Test author')
    expect(div).toHaveTextContent('Test title')
    expect(div).not.toHaveTextContent('www.testing.com')
    expect(div).not.toHaveValue(0)
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})