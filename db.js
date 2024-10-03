const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',          
  host: '192.168.1.47',          
  database: 'todo_db',        
  password: '123456', 
  port: 5432,                 
});


module.exports = pool;
