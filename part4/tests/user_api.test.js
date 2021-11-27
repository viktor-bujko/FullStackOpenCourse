const supertest = require("supertest")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

describe("When there is only one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("reallyDummyPassword", 13)
    const user = new User({
      username: "dummyUser",
      name: "Dummy",
      passwordHash: passwordHash
    })

    await user.save()
  })

  test("creation of new user with unique username", async () => {
    const allUsers = await helper.usersInDB()

    const newUniqueUser = {
      username: "uniquePerson",
      name: "Unique Person",
      password: "lessDumbPassword"
    }

    await api
      .post("/api/users")
      .send(newUniqueUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const updatedUsers = await helper.usersInDB()
    expect(updatedUsers).toHaveLength(allUsers.length + 1)

    const usernames = updatedUsers.map(user => user.username)

    expect(usernames).toContain(newUniqueUser.username)
  }, 100_000)

  test("creation of new user with already existing username fails", async () => {
    const allUsers = await helper.usersInDB()

    const newUser = {
      username: "dummyUser",
      name: "Nonamed User",
      password: "dumbPassword"
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    //console.log(result)

    expect(result.body.error).toContain("`username` to be unique")

    const updatedUsersList = await helper.usersInDB()

    expect(updatedUsersList).toHaveLength(allUsers.length)
  }, 100_000)

  test("creation of user without username fails", async () => {
    // exercise 4.16.*
    const allUsers = await helper.usersInDB()

    const newUser = {
      name: "Nonamed User",
      password: "dumbPassword"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const updatedUsers = await helper.usersInDB()

    expect(updatedUsers).toHaveLength(allUsers.length)
  }, 100_000)

  test("creation of user without password fails", async () => {
    // exercise 4.16.*
    const allUsers = await helper.usersInDB()

    const newUser = {
      username: "uniquenamewithoutpassword",
      name: "Nonamed User",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const updatedUsers = await helper.usersInDB()

    expect(updatedUsers).toHaveLength(allUsers.length)
  }, 100_000)

  test("creation of user with short password fails", async () => {
    // exercise 4.16.*
    const allUsers = await helper.usersInDB()

    const newUser = {
      username: "uniquename",
      name: "Nonamed User",
      password: "s"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    const updatedUsers = await helper.usersInDB()

    expect(updatedUsers).toHaveLength(allUsers.length)
  }, 100_000)
})
