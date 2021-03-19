const sendmail=require('./mail')
const random=require('random')
const emailcode=require('../DAO/emailCodeDao')
async function sendmailcode(email){
     const randomNum=random.int(100000,999999)
     await sendmail.sendMail(email,randomNum)
     await emailcode.InsertCode(email,randomNum)
    setTimeout(async ()=>{
        await emailcode.delCode(email)
        console.log("验证码清除了")},60000)

}

module.exports=sendmailcode