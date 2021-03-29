const {sequelize,DataTypes}=require('../config/db')
const User=require('./User')
const Live=sequelize.define('Live',{
    uid:{type:DataTypes.UUID,
          primaryKey:true},
    imgUrl:{type:DataTypes.STRING,
    defaultValue:''},
    title:DataTypes.STRING,
    publishUrl: DataTypes.STRING,
    playUrl:DataTypes.STRING,
    shopping:DataTypes.STRING,
    isLive:{type:DataTypes.BOOLEAN,
        defaultValue:false}
},{
    freezeTableName: true,
    timestamps:false  
})
User.hasOne(Live,{
    foreignKey: {
        name:'uid',
        type: DataTypes.UUID
      }
    })
Live.belongsTo(User)
module.exports=Live