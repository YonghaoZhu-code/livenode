const express=require('express')
const multer=require('multer')
const path=require('path')
const useDao=require('../DAO/UserDao')
const liveDao=require('../DAO/LiveDao')
const route=express.Router()
const baseUrl="static/headimg/"
let headerUrl
let imgUrl
//上传图形路径
const HeaderImgStorage = multer.diskStorage({
    //指定路径
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../public/headimg'))
    },
    //指定名字
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').pop())
      }
  })
//上传头像
const uploadHeaderImg=multer({storage:HeaderImgStorage})
route.post('/headerimg',uploadHeaderImg.single('img'),async (req,res,next)=>{
    const {email}=req.body
    headerUrl= baseUrl+req.file.filename
    await useDao.updataHeaderUrl(email,headerUrl)
    res.json({code:200,msg:'头像上传成功',headerUrl})
         
})

//上传直播封面路径
const LiveimgStorage = multer.diskStorage({
  //指定路径
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,'../public/liveimg'))
  },
  //指定名字
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.'+file.originalname.split('.').pop())
    }
})

const uploadliveimg=multer({storage:LiveimgStorage})
route.post('/liveimg',uploadliveimg.single('liveimg'),async (req,res,next)=>{
     const {uid}=req.body
     imgUrl='http://127.0.0.1:9300/static/liveimg/'+req.file.filename
     await liveDao.upliveimg(uid,imgUrl)
     res.json({code:200,msg:'直播封面上传成功',headerUrl})
         
})

//上传封面



module.exports=route