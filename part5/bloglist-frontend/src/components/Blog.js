import React from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, likeHandler }) => {

  return (
    <>
      <Togglable buttonLabel='more' closeLabel='Hide' childrenWhenHide1={blog.title} childrenWhenHide2={blog.author}>
        <p> {blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>Likes {blog.likes}<button onClick={likeHandler}>like</button></p>
      </Togglable>
    </>

  )}

export default Blog
