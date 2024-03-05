const { CustomError } = require("../config/error")
const utils = require("../utils")
const stripe = require("stripe")(process.env.STRIPE_KEY)

const YOUR_DOMAIN = "http://localhost:5173"

module.exports.payment = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: "thb",
                    product_data: {
                        name: `Package`,
                        description: ` ${req.body.days} ${req.body.days == 1 ? "day" : "days"}`,
                        images: ["https://www.siamcar.com/uploads/images/content/2023/05/04-bl3mvl.jpg"],
                    },
                    unit_amount_decimal: +req.body.total * 100,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.status(201).send({ clientSecret: session.client_secret })
})

module.exports.getstatus = utils.catchError(async (req, res, next) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

    if (session.status == "complete") {
        // create transaction
    }
    res.status(200).send({
        status: session.status,
        customer_email: session.customer_details.email,
    })
})
