import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

test('render content', () => {
  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: { username: 'test', name: 'Test Martin', id: '629dc3e9a43565d3e4420439' },
  }

  const component = render (
    <Blog blog={blog} user={{}}/>
  )

  expect(component.container).toHaveTextContent(
    'Type wars Robert C. Martin show'
  )

  const div = component.container.querySelector('.blog-content')
  expect(div).toEqual(null)
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: { username: 'test', name: 'Test Martin', id: '629dc3e9a43565d3e4420439' },
  }

  //   const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} user={{}}/>
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  component.debug()

  const element1 = component.container.querySelector('.url')
  expect(element1).toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  const element2 = component.container.querySelector('.likes')
  expect(element2).toHaveTextContent('2')


//   expect(mockHandler.mock.calls).toHaveLength(1)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
})