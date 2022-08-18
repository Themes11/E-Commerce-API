const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { sendEmail } = require("../email")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "Please provide firstname"],
        maxlength: 50
    },
    lastname:{
        type: String,
        required: [true, "Please provide your lastname"],
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    confirmationcode: {
        type: Number
    }
})

UserSchema.pre("save", async function(){
    this.confirmationcode = await Math.floor(Math.random()*10000)
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    await sendEmail(this.email, this.firstname, 3000, this.confirmationcode)
})
UserSchema.methods.generateToken = async function() {
    return jwt.sign({email:this.email, userId: this._id}, process.env.MONGO_URI, {expiresIn: "30d"}) 
}
UserSchema.methods.comparePassword = async function(userPassword) {
    const check = await bcrypt.compare(userPassword, this.password)
    return check 
}

module.exports = mongoose.model("User", UserSchema)