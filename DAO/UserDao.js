const user=require('../models/User')
const uuid=(require('uuid').v4()).replace(/-/g,'')
module.exports={
    createUser,
    findAllUser
}
//创建一个新用户
async function createUser(username,password,email){
await user.sync()
console.log("你好啊"+uuid);
const newuser= await user.create({uuid,username,password,email})
console.log(newuser.toJSON()) // 这样最好!
}
//查找所有用户
async function findAllUser(){
   return await user.findAll()
}

