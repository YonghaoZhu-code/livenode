const {sequelize,DataTypes}=require('../config/db')
const limit=sequelize.define('limit',{
    uid:{type: DataTypes.UUID,
        primaryKey:true},
    name:DataTypes.STRING,
    type:DataTypes.INTEGER},{
        freezeTableName: true,
        timestamps:false  
    })

module.exports=limit