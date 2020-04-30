import React from 'react'

import Togglable from './Togglable'

const Blog = ({ blog }) => {

  return (
    <>
      <Togglable buttonLabel='more' closeLabel='Hide' childrenWhenHide={blog.title}>
        <p> {blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
      </Togglable>
    </>

  )}

export default Blog
