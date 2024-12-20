const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    title:{type:String, required: true},
    content:{type:String, required: true},
    author:{type:String, required: true}
})

const Service = mongoose.model("Service", serviceSchema)
module.exports = Service