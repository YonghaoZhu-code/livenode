// 数据库连接配置文件
const { Sequelize,DataTypes} = require('sequelize')
const sequelize = new Sequelize('liveshop', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
})
module.exports={sequelize,DataTypes}

//测试连接数据库
// module.exports=async ()=>{
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.')
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }
