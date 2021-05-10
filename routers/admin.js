const express=require('express')
const route=express.Router()
const Apply=require('../DAO/ApplicantsDao')
const Admin=require('../DAO/AdminDao')

//获取申请列表
route.get('/getapply',async (req,res)=>{
      const {type}=req.query
      const getlist=await Apply.getapply(type)
      return res.json({code:200,apply:getlist})
})

//添加申请
route.get('/addapply',async (req,res)=>{
   const {uid,username,type,name}=req.query
   console.log('----'+uid,username,type,name);
   await Apply.addapply(uid,username,name,type)
   return res.json({code:200,msg:'ok'})
})

module.exports=route