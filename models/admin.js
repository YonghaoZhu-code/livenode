const {sequelize,DataTypes}=require('../config/db')
const shortid=require('shortid')
const Admin=sequelize.define('Admin',{
    uid:{type: DataTypes.UUID,
        primaryKey:true,
        defaultValue:shortid.generate()},
    username:DataTypes.STRING,
    password:{type:DataTypes.STRING,
        allowNull:false},
    role:{type:DataTypes.INTEGER,
           defaultValue:0}},{
    freezeTableName: true,
    timestamps:false  
})
           module.exports=Admin