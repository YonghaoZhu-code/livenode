const jwt=require('jsonwebtoken')
const tokenKey='UTFd56#hgp87'  //设定一个密钥
const Token={
    //加密(加密的数据，过期时间)
    encript(data,time) {
        return jwt.sign(data,tokenKey,{expiresIn:time})
    },
    //解密
    decript(token){
        try{
            let data=jwt.verify(token,tokenKey)
            return {
                token:true,
                data
            }
        }
        catch(e){
            return {
                token:false,
                data:e
            }
        }
    }
}
module.exports=Token