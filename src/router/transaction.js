const express = require("express")
const c = require("../controller")

const transactionRoute = express.Router()

transactionRoute.post("/create-checkout-session", c.transaction.payment)
transactionRoute.get("/session-status", c.transaction.getstatus)

module.exports = transactionRoute
