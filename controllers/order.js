const req = require("express/lib/request");
const Stripe = require("stripe")
const Cart = require("../models/cart");
const stripe = Stripe(process.env.STRIPE_KEY)
const Order = require("../models/order")
const payment =  async (req, res) => {
  const cartItems = await Cart.find({"userId": req.body.userId}, {description: 0})
  console.log(cartItems);
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cartItems: JSON.stringify(cartItems)
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items: cartItems.map((item) => {
        return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
              },
              unit_amount: Number(item.price)*100,
            },
            quantity: item.quantity,
        }
    }),
      customer: customer.id,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
  
    res.send({url: session.url});
  };


const createOrder = async (customer) => {
  const cartItems = JSON.parse(customer.metadata.cartItems)
  const order = await Order.create({
    items: cartItems,
    userId: customer.metadata.userId,
    payment_status: data.payment_status
  })
  console.log(order)
}

const endpointSecret = process.env.END_POINT;

let data
let eventType

const webHook =  (request, response) => {
  // const sig = request.headers['stripe-signature'];
  const payload = request.body
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret
  })

  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    console.log("verified");
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    console.log("failed");
    return;
  }
  data = event.data.object
  eventType = event.type

  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then((customer) => {createOrder(customer)})
  }

  response.send().end;
};

  module.exports = {payment, webHook}