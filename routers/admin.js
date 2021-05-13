const express=require('express')
const route=express.Router()
const Apply=require('../DAO/ApplicantsDao')
const Admin=require('../DAO/AdminDao')
const live=require('../DAO/LiveDao')
const Limit=require('../DAO/LimitDao')
//管理员登录
route.get('/login',async (req,res)=>{
      const {username,password}=req.query
      const getadmin=await Admin.isAdmin(username,password)
       if(getadmin===null){
             return res.json({code:400,msg:'登录失败！用户名或密码错误'})
       }
       res.json({code:200,msg:'ok',admin:getadmin})
})

//获取申请列表
route.get('/getapply',async (req,res)=>{
      const {type}=req.query
      const getlist=await Apply.getapply(type)
      return res.json({code:200,apply:getlist})
})

//添加申请
route.get('/addapply',async (req,res)=>{
   const {uid,username,type,name}=req.query
   await Apply.addapply(uid,username,name,type)
   return res.json({code:200,msg:'ok'})
})

//删除申请
route.get('/delapply',async (req,res)=>{
     const {uid}=req.query
     await Apply.delapply(uid)
     res.json({code:200,msg:'删除成功'})
})


//更新主播数据
route.get('/updateliver',async (req,res)=>{
      const {uid,name,gift,no}=req.query
      await live.changeNumber(uid,name,gift,no)
      return res.json({code:200,msg:'ok'})
   })

//封禁主播
route.get('/tieliver',async (req,res)=>{
      const {uid,name,type}=req.query
      await Limit.createlimit(uid,name,type)
      await live.delLiver(uid)
      return res.json({code:200,msg:'ok'})
   })

//封禁列表
route.get('/getlimit',async (req,res)=>{
      const {type}=req.query
      const limitlist=await Limit.foundLimit(type)
      return res.json({code:200,msg:'ok',limitlist})
   })

//删除封禁
route.get('/untielimit',async (req,res)=>{
      const {uid}=req.query
      await Limit.delLimit(uid)
      return res.json({code:200,msg:'ok'})
})

module.exports=route