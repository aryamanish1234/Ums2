const bcrypt = require("bcrypt");
const User = require('../models/user_models');
const jwt = require("jsonwebtoken");

const allUsers = async (req, res) => {
    try{
    const usersData = await User.findAll({
        raw: true
    });
    console.log(usersData)
    await res.render('home.ejs', {users: usersData});
}catch(err){
    console.log(err);

}
}

const crateUser = async (req, res) => {
    await res.render('adduser');
}

const Login = async(req, res) => {
    await res.render('login');
}



const adduser = async (req, res) => {
    try{
    console.log(req.body.username);
    console.log(req.body.email)
    if(req.body.password !== req.body.confirmpassword)
    {
       return res.status(200).send("Password do not match")
    }
    const user =  await User.create({
        userName: req.body.username,
        email:  req.body.email, 
        password:bcrypt.hashSync(req.body.password,8), 
        confirmPassword: bcrypt.hashSync(req.body.confirmpassword,8)
    })
    console.log(user);
    res.redirect('/home');
}catch(err){
    console.log(err);
}

}

const editUser = async(req, res) => {
    try{
        console.log("Checks URl")
    const id = req.params.id;
    console.log(id);

    const user =  await User.findOne({
       where:{
        id:id
       },
       raw:true
    })
    console.log(user);
    await res.render('edit', {user:user});
//    console.log("ddaaa")
}catch(err){
    console.log(err);
}
}

const updateuser = async (req, res ) =>{
    try{
        const id = req.params.id;
        const data ={
        userName: req.body.username,
        password:bcrypt.hashSync(req.body.password,8), 
        confirmPassword: bcrypt.hashSync(req.body.confirmpassword,8)
        }
        const selector = {where: {id:id}}
       await User.update(data, {
        where:{
            id
        }
       })
        res.redirect('/home');
    }catch(err){
        console.log(err);
    }
}

const viewUser = async(req,res) => {
    try{
        const id = req.params.id
        console.log(id)
        const user =  await User.findOne({
            where:{
             id:id
            },
            raw:true
         })
         console.log(user);
        
         await res.render('user.ejs', {user: user});
    }catch(err){
        console.log(err);
    }
}

const deleteUser = async(req,res) => {
    try{
        const id = req.params.id
        console.log(id)
        const user =  await User.destroy({
            where:{
             id:id
            }
         })
         
         if(user){
            res.redirect('/home');
         }
        
    }catch(err){
        console.log(err);
    }
}

const login = async(req, res) => {
    console.log("Hello Body",req.body);
    var email = req.body.email;
    console.log(email);
    const user =  await User.findOne({
        where:{
         email:email
        },
        raw:true
     })
    if (user == null) {
        return res.status(400).send({
            message: "Enter Valid Email "
        })
    }
 

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
       
        return res.status(401).send({
            message: "Invalid Password "
        })
    }
    const token = jwt.sign({ id: user.userId }, "1234",{
        expiresIn: 3600
    })
    //Access Token 
  //  return res.status(200).send("Message Done")
    res.redirect('/home');

}
module.exports = {
    allUsers, crateUser, adduser, editUser, updateuser,viewUser, login, Login, deleteUser
}