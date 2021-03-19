const {sequelize,DataTypes}=require('../config/db')
const emailcode=sequelize.define('Emailcode',{
    eid:{type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true},
    email:DataTypes.STRING,
    code:DataTypes.INTEGER
},{
    freezeTableName: true  
})
module.exports=emailcode