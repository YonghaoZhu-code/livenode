const express=require('express')
const route=express.Router()
//const userdao=require('../DAO/UserDao')
const live=require('../DAO/LiveDao')
route.get('/uuid',async (req,res)=>{
    // const {username,password,email}=req.query
    const {uid,imgUrl,title,shopping}=req.query
    // console.log(uid,imgUrl,title,shopping);
    await live.addLive({uid,imgUrl,title,publishUrl: `/live/${uid}`, playUrl: `/live/${uid}.flv`,shopping})
    // console.log(isadd)
    res.json({code:200,msg:'ok'})
    // await userdao.createUser(username,password,email)
//     res.json({code:200,msg:'ok'})
})


module.exports=route