const BadRequest = require("./badrequest")
const CustomAPIError = require("./customAPIError")
const NotFound = require("./notfound")
const Unauthenticated = require("./unauthenticated")

module.exports = {
    CustomAPIError,
    BadRequest,
    NotFound,
    Unauthenticated
}