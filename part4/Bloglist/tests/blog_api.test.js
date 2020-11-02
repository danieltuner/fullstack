const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const testBlogs = [
    {
        title: 'BMW',
        author: "The Car",
        url: "www.bmw.com",
        likes: 230
    },
    {
        title: 'Volvo',
        author: "The Family Car",
        url: "www.volvo.com",
        likes: 135
    }

]


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(testBlogs[0])
    await blogObject.save()

  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  })

  test('verifies unique id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

afterAll(() => {
  mongoose.connection.close()
})