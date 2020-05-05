import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login' closeLabel = 'cancel'>
      <LoginForm
        username = {username}
        password = {password}
        handleLogin = {handleLogin}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}>
      </LoginForm>
    </Togglable>
  )

  const newBlogForm = () => (
    <Togglable buttonLabel = 'post new' closeLabel = 'cancel'>
      <NewBlogForm blogs={blogs} setBlogs={setBlogs}></NewBlogForm>
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} is logged in</p>
          <button onClick={logoutUser}>logout</button>
          {newBlogForm()}
        </div>
      }

      <ul>
        {blogs.map((blog, i) => <Blog blog={blog} key={i}/>)}
      </ul>

    </div>
  )
}

export default App