const dummy = (blogsArray) => 1

const totalLikes = (blogsArray) =>
  blogsArray.reduce(
    (acc, blog) => acc + blog.likes,
    0
  )

const favoriteBlog = (blogsArray) => {
  const reducer = (acc, blog) => blog.likes > acc.likes ? blog : acc


  return blogsArray.reduce(reducer, { "likes": -1 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}