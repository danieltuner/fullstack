import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('view shows url and likes', () => {
  const user = {
    username: 'newGuy',
    password: 'new'
  }

  const blog = {
    title: 'All by myself',
    author: 'Myself',
    url: 'www.dontWanna.be',
    likes: 2,
    user: user

  }

  const component = render(
    <Blog blog={blog} user={user}>
    </Blog>
  )

  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})

test('double-clicking like, calls event handler two times', () => {
  const user = {
    username: 'newGuy',
    password: 'new'
  }

  const blog = {
    title: 'All by myself',
    author: 'Myself',
    url: 'www.dontWanna.be',
    likes: 3,
    user: user

  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler}>
    </Blog>
  )

  component.debug()

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})