const Token = require('../../plugins/token')
module.exports ={ verifyToken}
 function verifyToken(req,res,next){
      //登录页面无需token验证,跳过中间件
      if(req.path==='/login'){
          return next()
      }
      else{
          let token=String(req.headers.authorization).split(' ')[1]
          console.log('---'+token)
          let tokenVerifyObj=Token.decript(token)//解密
          if(tokenVerifyObj.token){
              next()
          }
          else{
             // console.log(token)
              res.json({code:401,message:'Token验证失败'})
          }
      }
  }
