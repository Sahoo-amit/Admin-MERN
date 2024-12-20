require('dotenv').config()
const express = require('express')
const router = require('./route')
const app = express()
const connectDB = require('./DB/db')
const cors = require('cors')

const corsOption ={
    origin: "http://localhost:5176",
    methods: "PUT,GET,POST,DELETE,PATCH"
}

app.use(cors(corsOption))

app.use(express.json())
app.use('/api',router)


const PORT = 4000
connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running at port ${PORT}`)
    })
})