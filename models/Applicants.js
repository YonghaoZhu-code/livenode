const {sequelize,DataTypes}=require('../config/db')
const User=require('./User')
const Applicants=sequelize.define('Applicants',{
    uid:{type:DataTypes.UUID,
          primaryKey:true},
    username:DataTypes.STRING,
    name:DataTypes.STRING, 
    type:DataTypes.INTEGER     
        }
        ,{
            freezeTableName: true,
            timestamps:false  
        })
        User.hasOne(Applicants,{
            foreignKey: {
                name:'uid',
                type: DataTypes.UUID
              }
            })
         Applicants.belongsTo(User)
        module.exports=Applicants