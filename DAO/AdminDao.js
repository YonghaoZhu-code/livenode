const admin=require('../models/admin')
const {Op}=require('sequelize')
module.exports={
    isAdmin
}

//匹配管理员用户名和密码
async function isAdmin(username,password){
    admin.sync()
    const ifadmin=await admin.findOne({
        where:{
            [Op.and]:[{username},{password}]
        }
    })
    return JSON.parse(JSON.stringify(ifadmin, null, 2))
}