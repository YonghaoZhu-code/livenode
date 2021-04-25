const user=require('./user')
const file=require('./file')
const live=require('./live')

//测试
const test=require('../test/test')
module.exports=app=>{
    app.use('/',user)
    app.use('/uploads',file)
    app.use('/',live)

    //单元测试
    app.use('/test',test)      
}