const express=require('express')
const route=express.Router()
const userdao=require('../DAO/UserDao')
const live=require('../DAO/LiveDao')
route.get('/adduser',async (req,res)=>{
    const {username,password,email,role}=req.query
    // const {uid,imgUrl,title,shopping}=req.query
    // const {uid}=req.query
    // console.log(uid,imgUrl,title,shopping);
    // await live.addLive({uid,imgUrl,title,publishUrl: `/live/${uid}`, playUrl: `/live/${uid}.flv`,shopping})
  //   let liver = await live.findLiver(uid)
  // if (liver===null) return  res.json({code:400,msg:'false'})
  // console.log('-------');
  // const up=await live.updataIslive({uid,isLive:true})
  // console.log(up)
 await userdao.createUserTest(username,password,email,role)
    res.json({code:200,msg:'ok'})
})

route.get('/addlive',async (req,res)=>{
  const {uid,name,title,type}=req.query
    const isadd=await live.addLiveTest(uid,name,title,type)
    console.log(isadd)
    res.json({code:200,msg:'ok'})
})


module.exports=route