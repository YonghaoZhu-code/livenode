
const emailcode=require('../models/Emailcode')
module.exports={
    InsertCode,
    codeFind,
    delCode}


//存入随机发生的邮箱验证码
async function InsertCode(email,code){
    await emailcode.sync()
   const isCreateCode= await emailcode.create({email,code})
   return JSON.parse(JSON.stringify(isCreateCode, null, 2))
}
//查询邮箱验证码
async function codeFind(email){
   const code= await emailcode.findAll({
    attributes:['code'],
    where:{email}},
   )
   return JSON.parse(JSON.stringify(code, null, 2))
}
//删除验证码
async function delCode(email){
    const isdel=await emailcode.destroy({
        where: {
          email
        }
      });
      return  JSON.parse(JSON.stringify(isdel, null, 2))  
}
