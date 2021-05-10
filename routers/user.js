const express=require('express')
const userdao=require('../DAO/UserDao')
const mail=require('../plugins/mail')
const emailcode=require('../DAO/emailCodeDao')
const random=require('random')
const route=express.Router()
// const token=require('../plugins/token')
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
     return res.json({code:200,msg:'发送成功'})
})

//注册用户
route.post('/register',async (req,res)=>{
    const {username,password,email,mailcode}=req.body
    //验证邮箱验证码
    const code= await emailcode.codeFind(email) 
    if(!code[0]) return res.json({code:401,msg:'验证码已过期，请重新发送'})
    if(mailcode!=code[0].code) return res.json({code:401,msg:'验证码错误'})
    const isuser=await userdao.findOne(email)
    if(isuser[0]) return res.json({code:401,msg:'该邮箱已注册，请登录'})
    const iscreate=await userdao.createUser(username,password,email)
     console.log(iscreate);
     return res.json({code:200,msg:'注册成功请登录'})
  })

  //用户登录
  //通过用户名或邮箱和密码
  route.post('/loginbypw',async (req,res)=>{
     const {loginid,password}=req.body
     const user=await userdao.findOne(loginid)
     if(!user[0]) return res.json({code:401,msg:'用户不存在'})
     if(password!=user[0].password) return res.json({code:401,msg:'密码错误'})
     //发送token
    //  let Token=token.encript({data:user[0].uid},'1h')
     const userInfo= await userdao.getUser(loginid)
     return res.json({code:200,msg:'登录成功',userInfo:userInfo[0]})

  })

  //通过邮箱验证码登录
  route.get('/loginbymail',async (req,res,next)=>{
    const {email,mailcode}=req.query
   //验证邮箱验证码
   const user=await userdao.findOne(email)
    if(!user[0]) return res.json({code:401,msg:'邮箱未注册'})
   const code= await emailcode.codeFind(email) 
   if(!code[0]) return res.json({code:401,msg:'验证码已过期，请重新发送'})
   if(mailcode!=code[0].code) return res.json({code:401,msg:'验证码错误'})
     //发送token
    //  let Token=token.encript({data:user[0].uid},'1h')
     return res.json({code:200,msg:'登录成功'})
 })

 //更新用户信息
route.get('/updatauser',async (req,res,next)=>{
    const {username,password}=req.query
    await userdao.udatauser(username,password)
    res.json({code:200,msg:'修改成功'})
})

//获取主播头像地址
route.get('/getheaderurl',async (req,res)=>{
   const {uid}=req.query
     const userinfo= await userdao.getUser(uid)
     const {HeaderUrl}=userinfo[0]
   return res.json({code:200,msg:'登录成功',HeaderUrl})

})

//修改用户角色
route.get('/changerole',async (req,res)=>{
  const {uid,role}=req.query
  await userdao.changerole(uid,role)
  return res.json({code:200,msg:'ok'})

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
