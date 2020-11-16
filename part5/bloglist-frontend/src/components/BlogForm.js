import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            value={title}
          />
        </div>
        <div>
            author:
          <input
            id='author'
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            value={author}
          />
        </div>
        <div>
            url:
          <input
            id='url'
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            value={url}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}

export default BlogForm