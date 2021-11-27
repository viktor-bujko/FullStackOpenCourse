const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({}).populate("blogs")
  response.json(allUsers)
})

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id)

  response.status(200).end()
})

usersRouter.post("/", async (request, response) => {
  // exercise 4.15.
  const userToCreate = request.body

  if (!userToCreate.password) {
    response.status(400).json({ error: "Password field is missing." })
    return
  }

  if (userToCreate.password.length < 3) {
    response.status(400).json({ error: "The password is too short. Please select longer password." })
    return
  }

  const saltRounds = 13
  const passwordHash = await bcrypt.hash(userToCreate.password, saltRounds)

  const user = new User({
    username: userToCreate.username,
    name: userToCreate.name,
    passwordHash: passwordHash
  })

  const newUser = await user.save()

  response.status(200).json(newUser)
})



module.exports = usersRouter