const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set("toJSON", {
  transform: (_, returned) => {
    returned.id = returned._id.toString()
    delete returned._v,
    delete returned._id
  }
})


module.exports = mongoose.model("Blog", blogSchema)