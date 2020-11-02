const mysql = require('mysql');
const {promisify} = require('util');
const config = require('./app-config.js');
const { Sequelize } = require('sequelize');

// const connection = mysql.createConnection({
//     host     : config().db.HOST,
//     user     : config().db.USER,
//     password : config().db.PWD,
//     database : config().db.NAME
// });

// connection.connect((err, connection) => {
//   if(err){
//     if(err.code === 'PROTOCOL_CONNECTION_LOST'){
//       console.error('Database connection was closed');
//     }
//     if(err.code === 'ER_CON_COUNT_ERROR'){
//       console.error('Database has too many connections');
//     }
//     if(err.code === 'ECONNREFUSED'){
//       console.error('Database connection was refused');
//     }
//   }
//   // if(connection) connection.release();
//   console.log('DB Connected');
//   return;
// });

// //Promisify Pool queries
// // promisify(connection.query).bind(connection);
// promisify(connection.query);

const sequelize = new Sequelize(config().db.NAME, config().db.USER, config().db.PWD, {
  host: config().db.HOST,
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    timestamps: false
  },
});

sequelize.authenticate()
.then(()=> console.log('DB connected!'))
.catch(err => console.log(err))


// module.exports = connection;
module.exports = sequelize;