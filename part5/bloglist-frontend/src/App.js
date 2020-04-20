import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
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

  const logoutUser = (event) =>{
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const blogForm = () => { 
    
    const hidenWhenVisible = {display: blogFormVisible ? 'none' : ''}
    const showWhenVisible = {display: blogFormVisible ? '' : 'none'}
    
    return(
  <>
  <h1>Blogs</h1>
  <div>
    {user.name} is logged in.
    <button onClick={logoutUser}>logout</button>
  </div>
  <br></br>
  <div style={hidenWhenVisible}>
    <button onClick={()=>setBlogFormVisible(true)}>Add New Blog</button>
  </div>
  <div style={showWhenVisible}>
  <NewBlogForm blogs={blogs} setBlogs={setBlogs}/>
  <button onClick={()=>setBlogFormVisible(false)}>Cancel</button>
  <br></br>
  </div>
  {blogs.map(blog =><Blog key={blog.id} blog={blog} user={user}/>)}
  </>
  )}
  
  

const loginForm = () => (
  <div>
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>      
)

  return (
    <>
    {user === null && loginForm()}
    {user !== null && blogForm()}
    </>
  )
  }

export default App