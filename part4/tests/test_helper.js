const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "The title of the first blog",
    author: "Nobody Body",
    url: "http://bestblogs.com/",
    likes: 42
  },
  {
    title: "How to plant your Echeveria",
    author: "Body Nobody",
    url: "http://evenbetterblogs.com/",
    likes: 99
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Temporary as inflation",
    author: "Powell",
    url: "http://def.com/",
    likes: 2021
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})

  console.log(`Found ${blogs.length} blogs in the database`)
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDB, nonExistingId
}