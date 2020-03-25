const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

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
    const blogsAtStart = helper.blogsInDb
    const blogToDelete = blogsAtStart[0]

    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    expect(blogsAfterDelete.length).toBe(helper.initialBlogs.length -1)
})


afterAll(()=>{
    mongoose.connection.close()
})