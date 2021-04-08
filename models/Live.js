const {sequelize,DataTypes}=require('../config/db')
const User=require('./User')
const Live=sequelize.define('Live',{
    uid:{type:DataTypes.UUID,
          primaryKey:true},
    imgUrl:{type:DataTypes.STRING,
    defaultValue:''},
    name:DataTypes.STRING,
    title:DataTypes.STRING,
    catalog: DataTypes.STRING,
    type:{type:DataTypes.INTEGER,
        defaultValue:1},
    fans:{type:DataTypes.INTEGER,
            defaultValue:1.2},
    gift:{type:DataTypes.INTEGER,
        defaultValue:30},
    no:{type:DataTypes.INTEGER,
        defaultValue:960},
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