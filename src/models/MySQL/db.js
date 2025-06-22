const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'culturutas',
  port: 3306,
  charset: 'utf8mb4',
});

db.connect((err) => {
  if(err) {
    console.error('Error conectando a la BD: ', err);
    return;
  }
  console.log('Conexión BD correcta');
})

module.exports = db;