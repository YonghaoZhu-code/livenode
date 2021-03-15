const nodemailer=require('nodemailer')
let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'liveshopadmin@163.com', // generated ethereal user
      pass: 'PWFXSDNTPTSFAOBI' // generated ethereal password
    }
  })
  
  async function sendMail (mail, code) {
    // send mail with defined transport object
    let content = {
      from: '"Atomic Delivery Admin" <liveshopadmin@163.com>', // sender address
      to: mail, // list of receivers
      subject: 'Email verification code', // Subject line
      html: `The email verification code of this request is:<b style='font-size: 18px;color: red'>${code}</b><br/>This verification code is valid within 1 minute, please input the verification code in time!` // html body
    }
    return transporter.sendMail(content)
  }
  
  module.exports = {sendMail}