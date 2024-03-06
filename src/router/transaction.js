const express = require("express")
const c = require("../controller")

const transactionRoute = express.Router()

transactionRoute.post("/create-checkout-session", c.transaction.payment)
transactionRoute.post("/session-status", c.transaction.getStatus)

module.exports = transactionRoute
