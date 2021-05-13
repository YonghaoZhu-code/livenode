const express=require('express')
const route=express.Router()
const live=require('../DAO/LiveDao')
const userDao=require('../DAO/UserDao')
//添加主播（管理员操作）
route.get('/admin/addlive',async(req,res)=>{
    const {uid,name,type}=req.query
   await live.addLive(uid,name,type)
   await userDao.changerole(uid,type)
    res.json({code:200,msg:'ok'})
    // const {uid,imgUrl,name,title,shopping}=req.query
    // const isadd=await live.addLive({uid,imgUrl,name,title, playUrl: `/live/${uid}.flv`,shopping})
    // console.log(isadd)
    // res.json({code:200,msg:'ok'})
})

//开启直播
route.get('/tolive',async(req,res)=>{
    const {uid,title,catalog,shopping}=req.query
    await live.onlive({uid,title,catalog, playUrl: `http://127.0.0.1:8989/live/${uid}.flv`,shopping})
    res.json({code:200,msg:'ok'})
})

//获取主播列表
route.get('/getlivers',async(req,res)=>{
    const livers=await live.getlivers('fans')
    console.log(livers)
    res.json({code:200,msg:'ok',livers})

})

//获取正在直播主播列表
route.get('/onliveing',async(req,res)=>{
    const livinglist = await live.isLiving()
    if(!livinglist[0]){
        res.json({code:400,livinglist})
    }
    res.json({code:200,livinglist})
})


//按分类获取主播列表
route.get('/getbytype',async(req,res)=>{
     const {type}=req.query
     const livers=await live.getLiverbytype(type)
     res.json({code:200,livers})
})

//管理员获取列表
route.get('/admin/getbytype',async(req,res)=>{
    const {type}=req.query
    const livers=await live.getLiverbytype(type)
    res.json({code:200,livers})
})

//管理粉丝等数目
route.get('/changenumber',async (req,res)=>{
    const {uid,fans,gift,no}=req.query
    await live.changeNumber(uid,fans,gift,no)
    res.json({code:200,msg:'ok'})
})
//查找主播
route.get('/getliverinfo',async (req,res)=>{
const {uid}=req.query
   const liver= await live.findLiver(uid)
   res.json({code:200,msg:'ok',liver})
})
module.exports=route