import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders the blogs title and author, but not url or likes', () => {
  const user = {
    username: 'newGuy',
    password: 'new'
  }

  const blog = {
    title: 'All by myself',
    author: 'Myself',
    url: 'www.dontWanna.be',
    likes: 1,
    user: user

  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )


  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)

  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)


})