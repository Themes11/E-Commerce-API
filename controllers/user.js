const {StatusCodes} = require("http-status-codes")
const { BadRequest, NotFound, Unauthenticated } = require("../Errors")
const { asyncWrapper } = require("../Middleware/async")
const User = require("../models/user")

const registerUser =asyncWrapper( async (req, res) => {
    const user = await User.create(req.body)
    res.status(StatusCodes.OK).json(user)
})
const confirmemail = asyncWrapper(async (req, res) => {
    await User.findOneAndUpdate({confirmationcode: Number(req.params.code)}, {active: true}, { new: true, runValidators: true })
    res.status(StatusCodes.OK).send("<h3>Your Email has been confirmed</h3> <a href = 'http://localhost:3000/api/v1/auth/login' >Please Login </a>")
})

const userLogin = asyncWrapper(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequest("Please provide email and password")
        // res.status(400).json({msg: "Please provide email and password"})
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new NotFound("No account with the specified email address")
    }
    const passwordCheck = await user.comparePassword(password)
    if(!passwordCheck) {
        throw new Unauthenticated("Invalid Password")
    }
    if(!user.active){
        throw new Unauthenticated("Verify your email")
    }
    const token = await user.generateToken()
    console.log(token)
    res.status(StatusCodes.OK).json({user, token})
})


module.exports = {
    registerUser,
    userLogin,
    confirmemail
}