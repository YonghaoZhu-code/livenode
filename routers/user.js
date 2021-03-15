const express=require('express')
const userdao=require('../DAO/UserDao')
const mail=require('../plugins/mail')
const emailcode=require('../DAO/emailCodeDao')
const random=require('random')
const route=express.Router()

//发送邮箱验证码
route.get('/sendmailcode',async (req,res)=>{
    const randomNum=random.int(100000,999999)
    const {email}=req.query
    await mail.sendMail(email,randomNum)
    await emailcode.InsertCode(email,randomNum)
    setTimeout(async ()=>{
        await emailcode.delCode(email)
        console.log("验证码清除了")},60000)
     return res.send('成功')
})

//注册用户
route.post('/register',async (req,res)=>{
    const {username,password,email,mailcode}=req.body
    const code= await emailcode.codeFind(email)
    if(mailcode!=(JSON.parse(code)[0].code)) return res.send('验证码错误')
      await userdao.createUser(username,password,email)
      res.send('success')
  })
// route.get('/iscode',async (req,res)=>{
//     const {email}=req.query
//     console.log(email);
//    const code= await emailcode.codeFind(email)
//    console.log(JSON.parse(code)[0].code)
//    setTimeout(async ()=>{
//     await emailcode.delCode(email)
//     console.log("验证码清除了")
//  },6000)
//     res.send('成功')


// })
module.exports=route
