const Contact = require('./DB/contact-model')
const User = require('./DB/model')
const bcrypt = require('bcryptjs')
const Service = require('./DB/service-model')

const register = async(req,res)=>{
    try {
        const {username, email, phone, password} = req.body
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(409).json({msg: `User already exists`})
        }
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password, salt)
        const createUser = await User.create({username, email, phone, password:hash_password})
        return res.status(201).json({msg: `User created successfully`, createUser, token: await createUser.generateToken()})
    } catch (error) {
        console.error(error)
    }
}

const login = async(req,res)=>{
    try {
        const {email, password} = req.body
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(409).json({msg:`User not found!!`})
        }
        const checkpassword = await bcrypt.compare(password, userExist.password)
        if(checkpassword){
            return res.status(201).json({msg:`User login sucessfully.`, token: await userExist.generateToken(), id:userExist._id})
        }
        return res.status(409).json({msg:`Invalid user credential`})
    } catch (error) {
        console.error(error)
    }
}

const contact = async(req,res)=>{
    try {
        const response = req.body;
        console.log(response);
        await Contact.create(response);
        return res.status(200).json({ message: "message send successfully" });
    } catch (error) {
        console.error(error)
    }
}

const user = async(req,res)=>{
    try {
        const userData = req.user
        const token = req.token
        res.status(201).json({userData, token})
    } catch (error) {
        console.log(error)
    }
}

const service = async(req,res)=>{
    try {
        const response = await Service.find()
        if(!response){
            return res.status(404).json({msg:`Service not found`})
        }
        res.status(200).json({msg: response})
    } catch (error) {
       console.log(error) 
    }
}

const admin_user = async(req,res)=>{
    try {
        const users = await User.find({},{password:0})
        if(!users){
            return res.status(404).json({msg:`User not found`})
        }
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
    }
}

const admin_contact = async(req,res)=>{
    try {
        const contact = await Contact.find()
        if(!contact){
            return res.status(404).json({msg:`Contact not found`})
        }
        res.status(200).json({contact})
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id
        await User.deleteOne({ _id:id})
        res.status(200).json({msg:`User deleted successfully.`})
    } catch (error) {
        console.log(error)
    }
}

const singleUser = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await User.findOne({_id:id}, {password: 0})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        const data = req.body
        const updateData = await User.updateOne({_id:id},{$set: data})
        res.status(200).json(updateData)
    } catch (error) {
        console.log(error)
    }
}

const deleteContact = async(req,res)=>{
    try {
        const id = req.params.id
        await Contact.deleteOne({_id:id})
        res.status(200).json({msg:`Contact deleted successfully`})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {register,login,contact,user,service,admin_user,admin_contact,deleteUser,singleUser,updateUser,deleteContact}