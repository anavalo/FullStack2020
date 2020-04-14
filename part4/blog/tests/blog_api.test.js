const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () =>{
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog=> new Blog(blog))
    const promiseArray = blogObjects.map(blog=>blog.save())
    await Promise.all(promiseArray)
})

test("amount of blog posts", async ()=>{
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})


test('successfull creation of new blog post', async ()=>{
    const newBlog = {
        title: "Cool days", author: "Tasos", url: "https://cooldays.com/", likes: 7 
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length+1)
})

test('delete one blog entry', async ()=>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length -1)
})

test('update blog entry', async ()=>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    // .send({"likes": 100})
    .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()
    expect(blogsAfterUpdate[0].body).toEqual(blogsAtStart[0].body)
})



describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'anavalo',
        password:'jediknight',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })


afterAll(()=>{
    mongoose.connection.close()
})