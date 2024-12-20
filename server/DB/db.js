const mongoose = require('mongoose')

const URI = process.env.MONGODB_ENV

const connectDB = async()=>{
    try {
        await mongoose.connect(URI)
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log(error)
        console.log(`Database connection failed`)
    }
}

module.exports = connectDB