const nodemailer=require('nodemailer')
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'atomicliveshop@outlook.com', // generated ethereal user
      pass: 'zyhyx3306' // generated ethereal password
    }
  })
  
  async function sendMail (mail, code) {
    // send mail with defined transport object
    let content = {
      from: '"原子直播带货管理员" <atomicliveshop@outlook.com>', // sender address
      to: mail, // list of receivers
      subject: '邮箱验证码', // Subject line
      html: `本次请求的邮箱验证码是:<b style='font-size: 18px;color: red'>${code}</b><br/>本次验证码在一分钟内有效，请及时输入!` // html body
    }
    return transporter.sendMail(content)
  }
  
  module.exports = {sendMail}