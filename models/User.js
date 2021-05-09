const {sequelize,DataTypes}=require('../config/db')
const shortid=require('shortid')
const User=sequelize.define('User',{
    uid:{type: DataTypes.UUID,
        primaryKey:true,
        defaultValue:shortid.generate},
    username:DataTypes.STRING,
    password:{type:DataTypes.STRING,
        allowNull:false},
    email:{type:DataTypes.STRING,
        allowNull:false},
    role:{type:DataTypes.INTEGER,
           defaultValue:1},
    HeaderUrl:{type:DataTypes.STRING,
        defaultValue:'static/headimg/default.jpg'}
},{freezeTableName: true})
module.exports=User