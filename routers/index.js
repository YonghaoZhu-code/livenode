const user=require('./user')
const file=require('./file')
const live=require('./live')
module.exports=app=>{
    app.use('/',user)
    app.use('/uploads',file)
    app.use('/',live)
       
}