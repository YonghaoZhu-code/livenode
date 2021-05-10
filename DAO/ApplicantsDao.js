const apply=require('../models/Applicants')
module.exports={
    getapply,
    delapply,
    addapply
}

async function getapply(type){
       await apply.sync()
    const getlist=await apply.findAll({
        where:{
            type
        }
    })
    return JSON.parse(JSON.stringify(getlist, null, 2))   
}

async function delapply(uid){
     await apply.sync()
     const delone=await apply.destroy({
         where:{uid}
     })
     return JSON.parse(JSON.stringify(delone, null, 2))
}

async function addapply(uid,username,name,type){
    await apply.sync()
    const addone=await apply.create({uid,username,name,type})
    return JSON.parse(JSON.stringify(addone, null, 2))
}