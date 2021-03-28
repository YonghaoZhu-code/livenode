const express=require('express')
const multer=require('multer')
const path=require('path')
const useDao=require('../DAO/UserDao')
const route=express.Router()
const baseUrl="127.0.0.1:9300/static/HeaderImg/"
let headerUrl
//上传图形路径
const HeaderImgStorage = multer.diskStorage({
    //指定路径
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'../public/HeaderImg'))
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

module.exports=route