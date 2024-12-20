const z = require('zod')

const signupSchema = z.object({
    username: z.string({required_error:`Username is required`}).trim().min({msg:`Name atleast 3 characters`}).max({msg:`Name mustn't exceed 30 chracters`}),
    email : z.string({required_error:`email is required`}).trim().min({msg:`email atleast 3 characters`}).max({msg:`email mustn't exceed 30 chracters`}),
    password: z.string({required_error:`password is required`}).trim().min({msg:`password atleast 3 characters`}).max({msg:`password mustn't exceed 30 chracters`}),
    phone: z.string({required_error:`phone is required`}).trim().min({msg:`phone atleast 3 characters`}).max({msg:`phone mustn't exceed 30 chracters`}),
})

const loginschema = z.object({
    email : z.string({required_error:`email is required`}).trim().min({msg:`email atleast 3 characters`}).max({msg:`email mustn't exceed 30 chracters`}),
    password: z.string({required_error:`password is required`}).trim().min({msg:`password atleast 3 characters`}).max({msg:`password mustn't exceed 30 chracters`}),
})

module.exports = {signupSchema, loginschema}