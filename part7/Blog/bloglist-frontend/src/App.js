import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import CommentForm from './components/CommentForm'
import loginService from './services/login'
import blogService from './services/blogs'
import usersService from './services/users'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Table, Button, Nav, Navbar  } from 'react-bootstrap'
import Container from '@material-ui/core/Container'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    usersService.getAll().then(users =>
      dispatch(initializeUsers(users)))
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(loginUser(user))
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    const meddelande = { message, type }
    dispatch(showNotification(meddelande, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(loginUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlogs(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const postComment = async (comment) => {
    const id = identifyBlog.id
    try {
      const newComment = { 'comment': comment }
      await blogService.comment(newComment, id)

      notifyWith(`Commented the blog: ${id} with: ${comment}`)
      dispatch(initializeBlogs(blogs.map(b => b.id === id
        ? { ...identifyBlog, comments: identifyBlog.comments.concat(comment) }
        : b
      )))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(blogToRemove.id))
      notifyWith(`Deleted blog: ${blogToRemove.title} by ${blogToRemove.author}.`)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    storage.logoutUser()
  }
  const identify = useRouteMatch('/users/:id')
  const identifyUser = identify
    ? users.find(user => user.id === (identify.params.id))
    : null

  const blogIdentifier = useRouteMatch('/blogs/:id')
  const identifyBlog = blogIdentifier
    ? blogs.find(user => user.id === (blogIdentifier.params.id))
    : null

  if ( !user ) {
    return (
      <div className="container">
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const User = () => {
    if(!identifyUser) {
      return null
    }
    if (user !== null) {
      const name = identifyUser.name

      return (
        <>
          <h2>{name}</h2>
          <b>added blogs</b>
          <ul>
            {identifyUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </>
      )}
    return
  }
  const BlogPage =() => {
    if(!identifyBlog) {
      return null
    }

    return (
      <>
        <h2>{identifyBlog.title} {identifyBlog.author}</h2>
        <a href={identifyBlog.url}>{identifyBlog.url}</a>
        <div>{identifyBlog.likes} likes <button onClick={() => handleLike(identifyBlog.id)}>like</button></div>
        <div>added by {identifyBlog.author}</div>
        <div>
          {user.username === identifyBlog.user.username && <button onClick={() => handleRemove(identifyBlog.id)}>remove</button>}</div>
        <h3>Comments:</h3>
        <CommentForm
          sendComment = {postComment}
          id = {identifyBlog.id}
        />
        <ul>
          {identifyBlog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </>
    )
  }
  const padding = {
    padding: 4,
    marginTop: 15,
    marginRight: 15
  }
  const paddingButton = {
    padding: 4,
    marginTop: 15
  }

  return (
    <div>
      <Container fixed>
        <Router>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/">blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link style={padding} to="/users">users</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    {user.name} logged in <Button style={paddingButton}  onClick={handleLogout}>logout</Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <h2>blog app</h2>

          <Notification />

          <Switch>
            <Route path="/users/:id">
              <User user={identifyUser}/>
            </Route>
            <Route path="/users">
              <h4>Users</h4>
              <Table striped>
                <thead>
                  <tr><th></th><th>blogs created</th></tr>
                </thead>
                <tbody>
                  {users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
                </tbody>
              </Table>
            </Route>
            <Route path="/blogs/:id">
              <BlogPage/>
            </Route>
            <Route path="/">
              <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>

              {blogs.sort(byLikes).map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLike={handleLike}
                  handleRemove={handleRemove}
                  own={user.username===blog.user.username}
                />
              )}
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App