import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const  blog = {
    author: 'Test author',
    title: 'Test title',
    likes: 0,
    url: 'www.testing.com'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog}>
        <div className="testDiv" />
      </Blog>
    )
  })

  test('url and likes are shown',() => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('www.testing.com')
    expect(div).toHaveTextContent('0')
  })
})

test('like button clicked twice', () => {

  const  blog = {
    author: 'Test author',
    title: 'Test title',
    likes: 0,
    url: 'www.testing.com'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} likeHandler={mockHandler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})


