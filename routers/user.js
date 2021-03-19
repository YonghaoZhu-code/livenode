const express=require('express')
const userdao=require('../DAO/UserDao')
const mail=require('../plugins/mail')
const emailcode=require('../DAO/emailCodeDao')
const random=require('random')
const route=express.Router()
const token=require('../plugins/token')
// const sendmailcode=require('../plugins/sendmailcode')

//发送邮箱验证码
route.get('/sendmailcode',async (req,res)=>{
    const {email}=req.query
    const randomNum=random.int(100000,999999)
     await mail.sendMail(email,randomNum)
     await emailcode.InsertCode(email,randomNum)
    setTimeout(async ()=>{
        await emailcode.delCode(email)
        console.log("验证码清除了")},60000)
     return res.json({code:200,message:'发送成功'})
})

//注册用户
route.post('/register',async (req,res)=>{
    const {username,password,email,mailcode}=req.body
    //验证邮箱验证码
    const code= await emailcode.codeFind(email) 
    if(!code[0]) return res.send("验证码过期，请重新发送")
    if(mailcode!=code[0].code) return res.send('验证码错误')
    const isuser=await userdao.findOne(email)
    if(isuser[0]) return res.send("该邮箱已注册")
    const iscreate=await userdao.createUser(username,password,email)
     console.log(iscreate);
      res.send('success')
  })

  //用户登录
  //通过用户名或邮箱和密码
  route.post('/loginbypw',async (req,res)=>{
     const {loginid,password}=req.body
     const user=await userdao.findOne(loginid)
     if(!user[0]) return res.json({code:401,message:'用户不存在'})
     if(password!=user[0].password) return res.json({code:401,message:'密码错误'})
     //发送token
     let Token=token.encript({data:user[0].uuid},'1h')
     return res.json({code:200,message:'登录成功',Token})

  })

  //通过邮箱验证码登录
  route.get('/loginbymail',async (req,res,next)=>{
    const {email,code}=req.query
   //验证邮箱验证码
   const user=await userdao.findOne(email)
    if(!user[0]) return res.send("邮箱未注册")
   const code= await emailcode.codeFind(email) 
   if(!code[0]) return res.send("验证码过期，请重新发送")
   if(mailcode!=code[0].code) return res.send('验证码错误')
     //发送token
     let Token=token.encript({data:user[0].uuid},'1h')
     return res.json({code:200,message:'登录成功',Token})
 })
  //通过邮箱和验证码
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