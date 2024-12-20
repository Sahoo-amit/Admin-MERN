const jwt = require('jsonwebtoken')
const User = require('./DB/model')

const jwt_middleware = async(req,res,next)=>{
    const token = await req.header("Authorization")
    if(!token){
        return res.status(401).json({msg:`Token not found`})
    }
    try {
        const updatedToken = token.replace("Bearer","").trim()
        const isVerified = jwt.verify(updatedToken, process.env.JSONTOKEN)

        const userData = await User.findOne({email: isVerified.email})

        req.user = userData
        req.token = token
        req.userId = userData._id

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = jwt_middleware