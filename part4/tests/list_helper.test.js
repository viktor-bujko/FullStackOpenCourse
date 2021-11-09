const listHelper = require("../utils/list_helper")

const createNewBlog = (title, author, url, likes) => {
  return {
    "title": title,
    "author": author,
    "url": url,
    "likes": likes
  }
}

const likes1 = 50
const likes2 = 99
const likes3 = 3456
const likes4 = 1

const blogs = [
  createNewBlog("Blog #1", "Author #1", "http://bestblogs.com/1", likes1),
  createNewBlog("Blog #2", "Author #2", "http://bestblogs.com/2", likes2),
  createNewBlog("Blog #3", "Author #3", "http://bestblogs.com/3", likes3),
  createNewBlog("Blog #4", "Author #4", "http://bestblogs.com/4", likes4)
]

const courseSiteBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("totalLikes", () => {

  test("of an empty blog array", () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test("when blogsArray has one blog only -> totalLikes equals blog.likes", () => {
    const likes = 99
    const result = listHelper.totalLikes([{
      "title": "Blog post",
      "url": "bestblogs.com",
      "author": "unknown",
      "likes": likes
    }])

    expect(result).toBe(likes)
  })

  test("or larger list", () => {
    // blogs are to be reused in other tests
    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(likes1 + likes2 + likes3 + likes4)
  })

  test("from course site", () => {
    // blogs are to be reused in other tests
    const result = listHelper.totalLikes(courseSiteBlogs)

    expect(result).toBe(7 + 5 + 12 + 10 + 0 + 2)
  })
})

describe("favouriteBlog", () => {
  test("of no blogs", () => {

    expect(listHelper.favoriteBlog([])).toStrictEqual({ "likes": -1 })
  })

  test("of only one blog in array", () => {
    const result = listHelper.favoriteBlog([blogs[0]])

    expect(result).toBe(blogs[0])
  })

  test("of all my-defined blogs", () => {
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toBe(blogs[2])
  })

  test("of all course-defined blogs", () => {
    const result = listHelper.favoriteBlog(courseSiteBlogs)

    expect(result).toBe(courseSiteBlogs[2])
  })
})