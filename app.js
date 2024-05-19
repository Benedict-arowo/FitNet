const express = require('express')
const userRouter = require('./routes/userRoutes')
const bodyParser= require('body-parser')
const app = express();
PORT = 5000

app.use(express.json());
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})