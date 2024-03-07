const { CustomError } = require("../config/error")
const repo = require("../repository")
const utils = require("../utils")
const stripe = require("stripe")(process.env.STRIPE_KEY)

const YOUR_DOMAIN = "http://localhost:5173"

module.exports.payment = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
            {
                price_data: {
                    currency: "thb",
                    product_data: {
                        name: `Package`,
                        description: ` ${req.body.days} ${req.body.days == 1 ? "day" : "days"}`,
                        images: ["https://www.siamcar.com/uploads/images/content/2023/05/04-bl3mvl.jpg"],
                    },
                    unit_amount_decimal: +req.body.amount * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}&postId=${req.body.postId}&days=${req.body.days}&amount=${req.body.amount}`,
    })

    res.status(201).send({ clientSecret: session.client_secret })
})

module.exports.getStatus = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
    let paymentIntentId = null
    if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
        paymentIntentId = paymentIntent.id
        // console.log(paymentIntentId)
    }

    if (session.status == "complete") {
        // check if paymentId already created to database
        const existingPaymentId = await repo.payment.getPaymentByPaymentId(paymentIntentId)

        // create transaction if paymentId is not existed
        if (!existingPaymentId) {
            const payment = await repo.payment.createPayments({ ...req.body, paymentId: paymentIntentId })
            console.log(payment)
            const updatePostStatus = await repo.post.editPostStatusAndDateById(req.body.days, req.body.postId)
            console.log(updatePostStatus)
        }
    }
    res.status(200).send({
        status: session.status,
        customer_email: session.customer_details.email,
        paymentId: paymentIntentId,
    })
})
