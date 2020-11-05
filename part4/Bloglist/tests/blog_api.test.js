const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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
    },
    {
        title: 'Toyota',
        author: "The Automobile",
        url: "www.toyota.com",
        likes: 334
    }

]


beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of testBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

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

  test('a new blog is added', async () => {
    const newBlog = {
        title: 'new car blog',
        author: "Toyota",
        url: "www.toyota.com",
        likes: 334
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const bloglist = await Blog.find({})
    expect(bloglist).toHaveLength(testBlogs.length + 1)
    const authors = bloglist.map(blog => blog.author)
    expect(authors).toContain(newBlog.author)


  })

  test('with no likes, default is 0', async () => {
    const newBlog = {
        title: 'No one likes Lada',
        author: "Lada",
        url: "www.lada.ru",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

   const bloglist = await Blog.find({})

   expect(bloglist[testBlogs.length].likes).toBe(0)
})

test('blog must have title and url', async () => {
  const newBlog = {
      author: "Koenigsegg"
  }

  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  const bloglist = await Blog.find({})

  expect(bloglist).toHaveLength(testBlogs.length)
})

test('status code 204 works with valid id', async () => {
  const bloglist = await Blog.find({})
  const blogToDelete = bloglist[0]

  await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

  const blogsAtEnd = await Blog.find({})  

  expect(blogsAtEnd).toHaveLength(
    testBlogs.length - 1
)

  const blog = blogsAtEnd.map(blog => blog.title)

  expect(blog).not.toContain(blogToDelete.title)
})

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secretStuff', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('new user is created', async () => {
  const usersStart = await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'something',
    name: 'Some One',
    password: 'anything',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersEnd = await User.find({})
  const usersAtEnd = await usersEnd.map(u => u.toJSON())
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

test('creation fails with proper statuscode and message if username already in system', async () => {
  const usersStart= await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'root',
    name: 'Someone Else',
    password: 'cryptonatic',
}

const result = await api
.post('/api/users')
.send(newUser)
.expect(400)
.expect('Content-Type', /application\/json/)

expect(result.body.error).toContain('`username` to be unique')

const usersEnd = await User.find({})
const usersAtEnd = await usersEnd.map(u => u.toJSON())

expect(usersAtEnd).toHaveLength(usersAtStart.length)

})

afterAll(() => {
  mongoose.connection.close()
})

