const {payment, webHook} = require("../controllers/order")
const express = require("express")

const paymentRouter = require("express").Router()

paymentRouter.post("/", payment)
paymentRouter.post("/webhook", express.raw({type: 'application/json'}), webHook)


module.exports = paymentRouter