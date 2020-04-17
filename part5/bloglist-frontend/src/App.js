import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
    console.log('logout')
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }


  const blogForm = () =>     
  <div>
  <h2>blogs</h2>
  <div>
    {user.name} is logged in.
    <button onClick={logoutUser}>logout</button>
  </div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} user={user}/>
  )}
</div>

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