import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password, please try again.')
      setTimeout(() => {
      setErrorMessage(null)
      }, 4000)
    }
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        setMessage(`The new blog: ${newBlogTitle}, was added by ${newBlogAuthor}.`)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in: </h2>
        <Notification message={message} errorMessage={errorMessage} />
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
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.name}, login successful!
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      }}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
      <div>
      title:
          <input
              name="title"
              onChange={({ target }) => setNewBlogTitle(target.value)}
              type="text"
              value={newBlogTitle}
          />
      </div>
      <div>
          author:
          <input
              name="author"
              onChange={({ target }) => setNewBlogAuthor(target.value)}
              type="text"
              value={newBlogAuthor}
          />
        </div>
        <div>
          url:
          <input
              name="url"
              onChange={({ target }) => setNewBlogUrl(target.value)}
              type="text"
              value={newBlogUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App