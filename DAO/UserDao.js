const user=require('../models/User')
const {Op}=require('sequelize')
// const uuid=(require('uuid').v4()).replace(/-/g,'')
module.exports={
    createUser,
    findAllUser,
        findOne,
        getUser,
        updataHeaderUrl

}
//创建一个新用户
async function createUser(username,password,email){
await user.sync()
const newuser= await user.create({username,password,email})
   return JSON.parse(JSON.stringify(newuser, null, 2))
}

//查找用户通过用户名或邮箱
async function findOne(loginid){
    await user.sync()
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
 //获取用户信息
 async function getUser(loginid){
    await user.sync()
    const userInfo= await user.findAll({
     attributes:['username','email','role','HeaderUrl'],
     where:{
        [Op.or]:[
            {username:loginid},
            {email:loginid}
       ]
        }},
    )
    return JSON.parse(JSON.stringify(userInfo, null, 2))
 }
 
//更新用户头像地址
async function updataHeaderUrl(email,headerurl){
    await user.sync()
  const isupdata=await user.update({HeaderUrl:headerurl},{
      where:{email}
  })
  return JSON.parse(JSON.stringify(isupdata, null, 2))
}
//查找用户名
async function findAllUser(){
    await user.sync()
   const alluser= await user.findAll()
   return JSON.parse(JSON.stringify(alluser, null, 2))
}

