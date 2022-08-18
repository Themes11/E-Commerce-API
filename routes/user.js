const { registerUser, confirmemail, userLogin } = require("../controllers/user")

const userrouter = require("express").Router()

userrouter.post("/register", registerUser)
userrouter.post("/login", userLogin)
userrouter.get("/confirm/:code", confirmemail)

module.exports = {userrouter}