const {sequelize,DataTypes}=require('../config/db')
const User=require('./User')
const Live=sequelize.define('Live',{
    uuid:{type:DataTypes.UUID,
        unique:true
    },
    imgUrl:{type:DataTypes.STRING,
    defaultValue:''},
    title:DataTypes.STRING,
    publishUrl: DataTypes.STRING,
    playUrl:DataTypes.STRING,
    shopping:DataTypes.STRING,
    isLive:{type:DataTypes.BOOLEAN,
        defaultValue:false}
},{
    freezeTableName: true  
})
User.hasOne(Live,{
    foreignKey: {
        type: DataTypes.UUID
      }
    })
Live.belongsTo(User)
module.exports=Live