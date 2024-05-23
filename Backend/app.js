const express = require('express')
const userRouter = require('./routes/user.route')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const app = express();
PORT = 5000

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
	legacyHeaders: false, 
});

app.use(helmet())

app.use(limiter);

app.use(express.json());
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})