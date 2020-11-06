const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(bloglist.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const user = await User.findById(users[0]._id)

  const blog = new Blog({
    author: body.author,
    title: body.title,    
    url: body.url,
    likes: body.likes || 0,
    user: users[0]._id
  })

  try {
    const savedBlog = await blog.save()
    user.bloglist = user.bloglist.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
} catch(exception) {
    response.status(400).end()
}

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  })


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes || 0,
  }

  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter