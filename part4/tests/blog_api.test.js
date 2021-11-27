const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  /*console.log("cleared")

  const blogsObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())


  await Promise.all(promiseArray)

  console.log("done")*/
})

describe("Initial blogs tests - exercise 4.8.", () => {
  test("blog info returned as json", async () => {
    await api
      .get("/")
      .expect("Content-Type", /application\/json/)
  })

  test("there is correct number of blogs", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("there is echeveria blog in the list", async () => {
    const response = await api.get("/api/blogs")

    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain("How to plant your Echeveria")
  })

  test("A blog has an 'id' property - exercise 4.9*", async () => {
    const blogs = await helper.blogsInDB()

    const blogToInspect = blogs[0]

    expect(blogToInspect.id).toBeDefined()
  }, 100_000)

  test("Likes property defaults to 0 if missing in request - exercise 4.11.*", async () => {
    const blogTitle = "How to write a blog without likes"
    const blogWithoutLikesField = {
      title: blogTitle,
      author: "Unpopular Author",
      url: "http://blogslikedbyall.com/"
    }

    const added = await api
      .post("/api/blogs")
      .send(blogWithoutLikesField)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(added.body.likes).toEqual(0)
  })
})

describe("Viewing a specific blog", () => {
  test("with correct id - succeeds", async () => {
    const allBlogs = await helper.blogsInDB()
    const blogToShow = allBlogs[0]

    const result = await api
      .get(`/api/blogs/${blogToShow.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const viewBlog = JSON.parse(JSON.stringify(blogToShow))

    expect(result.body).toEqual(viewBlog)
  })

  test("fails with 404 status for nonexisting blog id", async () => {
    const nonExisting = await helper.nonExistingId()

    console.log(nonExisting)

    await api
      .get(`/api/blogs/${nonExisting}`)
      .expect(404)
  })

  test("fails with 400 status for invalid id", async () => {
    const invalidId = "invalidId"

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe("Adding a new note", () => {
  test("a new valid blog succeeds - exercise 4.10.", async () => {
    const newBlogTitle = "Our Echeveria is beautiful!"

    const newBlog = {
      title: newBlogTitle,
      author: "Body Nobody",
      url: "http://evenbetterblogs.com/",
      likes: 23
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    const contents = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(newBlogTitle)
  })

  test("a blog without title fails with 400 status - exercise 4.12.*", async () => {
    const blogWithoutTitle = {
      author: "Author of the incorrectly created blog",
      url: "http://poorblogs.com/",
      likes: 90
    }

    await api
      .post("/api/blogs")
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test("a blog without url fails with 400 status too - exercise 4.12.*", async () => {
    const blogWithoutUrl = {
      title: "I have title but not URL",
      author: "Author of the incorrectly created blog",
      likes: 0
    }

    await api
      .post("/api/blogs")
      .send(blogWithoutUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test("Missing both title and url -> causing 400 - exercise 4.12.*", async () => {
    const blogWithoutFields = {
      author: "Author of the blog",
      likes: 90
    }

    const blog = new Blog(blogWithoutFields)
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const blogsAfter = await helper.blogsInDB()

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

})

describe("A blog can be deleted", () => {
  test("succeeds with 204 status if id is valid", async () => {
    const allBlogs = await helper.blogsInDB()
    const blogToDelete = allBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDB()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAfter.map(blog => blog.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe("A blog can be updated", () => {
  test("valid update", async () => {
    const allBlogs = await helper.blogsInDB()
    const blogToUpdate = allBlogs[0]

    const oldLikes = blogToUpdate.likes
    const difference = 42

    const newBlog = { ...blogToUpdate }
    newBlog.likes = oldLikes + difference

    const updated = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect("Content-Type", /application\/json/)

    expect(updated.body.likes - oldLikes).toEqual(difference)
  })
})

afterAll(() => {
  mongoose.connection.close()
})