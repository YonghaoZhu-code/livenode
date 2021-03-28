const {sequelize,DataTypes}=require('../config/db')
const User=sequelize.define('User',{
    uuid:{type: DataTypes.UUID,
        allowNull:false
         },
    username:DataTypes.STRING,
    password:{type:DataTypes.STRING,
        allowNull:false},
    email:{type:DataTypes.STRING,
        allowNull:false},
    role:{type:DataTypes.INTEGER,
           defaultValue:1},
     HeaderUrl:DataTypes.STRING
},{freezeTableName: true})
module.exports=User