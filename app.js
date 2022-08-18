require("dotenv").config()
require("express-async-error")
const express = require("express")
const connectDB = require("./db/connectdb")
const errorHandler = require("./Middleware/error-handler")
const notfound = require("./Middleware/not-found")
const { userrouter } = require("./routes/user")
const productRouter = require("./routes/product")
const paymentRouter = require("./routes/order")
const cartRouter = require("./routes/cart")
const authentication = require("./Middleware/auth")
const app = express()
const port = process.env.PORT || 3000

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", userrouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/checkout",authentication, paymentRouter)
app.use("/api/v1/cart", authentication, cartRouter)



app.use(notfound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port: ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
