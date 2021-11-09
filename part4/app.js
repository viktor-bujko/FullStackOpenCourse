const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const mw = require("./utils/middleware")

logger.info("trying to connect to db: ", config.DB_URI)

mongoose
  .connect(config.DB_URI)
  .then(() => {
    logger.info("connected to db: ", config.DB_URI)
  })
  .catch(error => logger.error(error))

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use(mw.unknownEndpoint)
app.use(mw.errorHandler)

module.exports = app