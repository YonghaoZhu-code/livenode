const express=require('express')
const route=express.Router()
const live=require('../DAO/LiveDao')
//添加直播
route.get('/addlive',async(req,res)=>{
    const {uid,imgUrl,title,shopping}=req.query
    const isadd=await live.addLive({uid,imgUrl,title,publishUrl: `/live/${uid}`, playUrl: `/live/${uid}.flv`,shopping})
    console.log(isadd)
    res.json({code:200,msg:'ok'})
})

//查询正在直播
route.get('/onliveing',async(req,res)=>{

})

module.exports=route