import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs , setBlogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => { setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      })
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
    title:<input type="text" value={newTitle} name="Title" onChange={({ target }) => setNewTitle(target.value)}></input>
        </div>
        <div>
    author:<input type="text" value={newAuthor} name="Author" onChange={({ target }) => setNewAuthor(target.value)}></input>
        </div>
        <div>
    url:<input type="text" value={newUrl} name="Url" onChange={({ target }) => setNewUrl(target.value)}></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default NewBlogForm