const user=require('../models/User')
const {Op}=require('sequelize')
const uuid=(require('uuid').v4()).replace(/-/g,'')
module.exports={
    createUser,
    findAllUser,
        findOne

}
//创建一个新用户
async function createUser(username,password,email){
await user.sync()
const newuser= await user.create({uuid,username,password,email})
   return JSON.parse(JSON.stringify(newuser, null, 2))
}

//查找用户通过用户名或邮箱
async function findOne(loginid){
    const finduser= await user.findAll({
     where:{
         [Op.or]:[
             {username:loginid},
             {email:loginid}
        ]
         }},
    )
    return JSON.parse(JSON.stringify(finduser, null, 2))
 }
//查找用户名
async function findAllUser(){
   const alluser= await user.findAll()
   return JSON.parse(JSON.stringify(alluser, null, 2))
}

