const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

    if (body.username === undefined || body.username === null) {
        return response.status(400).json({ error: 'Add a username.' })
    }

    if (body.password === undefined || body.password === null) {
        return response.status(400).json({ error: 'Use your password.' })
    }

    if (body.username.length < 3) {
        return response.status(400).json({ error: 'Username must be longer than 2 characters.' })
    }

    if (body.password.length < 3) {
        return response.status(400).json({ error: 'Password must be longer than 2 characters.' })
    }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
      const savedUser = await user.save()
      response.json(savedUser)
    } catch(exception) {
        response.status(400).end()
        response.status('Content-Type', /application\/json/).end()
    }
})

module.exports = usersRouter
