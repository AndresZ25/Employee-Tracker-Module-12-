require('dotenv').config(); 
const { Client } = require('pg');  


const client = new Client({
  host: process.env.DB_HOST || 'localhost',  
  user: process.env.DB_USER,               
  password: process.env.DB_PASSWORD,        
  database: process.env.DB_NAME,          
  port: process.env.DB_PORT || 5432,        
});


client.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Connection error", err.stack));

module.exports = client;  
