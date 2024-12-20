const validate = (schema) => async (req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body)
        req.body= parseBody
        next()
    } catch (err){
        console.log(err);
        const message = err.errors[0].message
        console.error(`error`,message)
        res.json({msg: message})
        next(message)
    }
}

module.exports = validate