const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const users = await User.find({})

  const user = users[Math.floor(Math.random() * users.length)]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save({ validateBeforeSave: false })
  response.status(200).json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete("/:id", async (request, response) => {
  // Deleting a single blog post resource - exercise 4.13.

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  // Allowing blog information modification for an individual blog post - exercise 4.14.

  const updatedBlog = { ...request.body }

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  )

  response.json(updated)
})

module.exports = blogsRouter