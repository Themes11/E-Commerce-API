const jwt = require("jsonwebtoken")
const { Unauthenticated } = require("../Errors")
const { asyncWrapper } = require("./async")

const authentication = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new Unauthenticated("Token is not present")
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        throw new Unauthenticated("Token is not present")
    }
    const payload = await jwt.verify(token, process.env.MONGO_URI)
    req.user = payload

    next()
})

module.exports = authentication