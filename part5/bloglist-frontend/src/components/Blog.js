import React, { useState } from 'react'

const Blog = ({ blog,  updateBlog, user, deleteBlog }) => {
  const [viewInfo, setViewInfo] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    updateBlog(id, blogObject)
  }
  const handleDeleteClick = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  return (
    <div style={blogStyle} className="blog" >
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setViewInfo(!viewInfo)}>{viewInfo === true ? 'hide' : 'view'}</button>
      </div>
      {viewInfo === true ?
        <div>
          <div>
            {blog.url}
          </div>
          <div id='likes'>
            Likes: {blog.likes}
            <button id='like-button' onClick={() => {handleClick()}}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {user.name === blog.user.name ?
            <div>
              <button id='Remove-button' onClick={() => handleDeleteClick()}>Remove</button>
            </div>
            :
            null
          }
        </div>
        :
        null
      }
    </div>
  )
}
export default Blog