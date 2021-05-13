const Limit=require('../models/limit')

module.exports={
    createlimit,
    delLimit,
    foundLimit
}

//创建封禁主播
async function createlimit(uid,name,type){
    await Limit.sync()
    const newlimit=await Limit.create({uid,name,type})
    return JSON.parse(JSON.stringify(newlimit, null, 2))
}

//删除封禁主播
async function delLimit(uid){
    await Limit.sync()
    const delimit=await Limit.destroy({
        where:{uid}
    })
    return JSON.parse(JSON.stringify(delimit, null, 2))
}

//查看封禁主播
async function foundLimit(type){
    await Limit.sync()
    const getlimit=await Limit.findAll({
        where:{type}
    })
    return JSON.parse(JSON.stringify(getlimit, null, 2))
}