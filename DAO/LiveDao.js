const live=require('../models/Live')
const {Op}=require('sequelize')
module.exports={
  addLive,
  updataIslive,
  findLiver,
  onlive,
  isLiving,
  changeNumber,
  getlivers,
  addLiveTest,
  upliveimg
}

//添加用户直播
 async function addLive(uid,name,type){
    await live.sync()
    const newlive=await live.create({uid,name,type})
    return JSON.parse(JSON.stringify(newlive, null, 2))
 }

 //添加用户直播测试
 async function addLiveTest(uid,name,title,type){
   await live.sync()
   const newlive=await live.create({uid,name,title,type})
   return JSON.parse(JSON.stringify(newlive, null, 2))
}
//上传封面更新直播封面地址
async function upliveimg(uid,imgUrl){
   const isupload=await live.update({imgUrl},{
      where:{uid}
   })
   return JSON.parse(JSON.stringify(isupload, null, 2))
}
//用户开启直播更新数据
async function onlive({uid,title,catalog,playUrl,shopping}){
   await live.sync()
    const isonlive=await live.update({title,catalog,playUrl,shopping},{
       where:{uid}
   })
   return JSON.parse(JSON.stringify(isonlive, null, 2))
}

//获取value值为前10的主播列表
async function getlivers(value){
   await live.sync()
   const livers=await live.findAndCountAll({
      order: [
         [value, 'DESC']],
         limit:10
   })

return JSON.parse(JSON.stringify(livers, null, 2))
}

//管理主播粉丝，礼物，排行数
async function changeNumber(uid,fans,gift,no){
   await live.sync()
    const isChange =await live.update({fans,gift,no},{
       where:{uid}
   })
   return JSON.parse(JSON.stringify(isChange, null, 2))
}

 //更新用户直播状态
 async function updataIslive({uid,isLive}){
    await live.sync()
     const uplive=await live.update({isLive},{
        where:{uid}
    })
    return JSON.parse(JSON.stringify(uplive, null, 2))
 }
 //寻找用户
//  async function findLiver(uid){
//     const liver=await live.findAll({
//        where:{uid}
//    })
//    return JSON.parse(JSON.stringify(liver, null, 2))
// }
//查找主播
async function findLiver(uid){
    await live.sync()
    const liver=await live.findOne({ where:{uid}})
   return JSON.parse(JSON.stringify(liver, null, 2))
}

//寻找正在直播的用户
async function isLiving(){
    await live.sync()
    const living=await live.findAll({
       where:{islive:true}
   })
   return JSON.parse(JSON.stringify(living, null, 2))
}