//DATABASE CONNECTION FILE
import pgPromise from 'pg-promise'; //lib to work with db; returns data in js( array of objects)
import dotEnv from 'dotenv';
dotEnv.config(); //process.env object has sensitive variables from .env file




//CONNECTING TO DB SERVER (GOOGLE CLOUD):
const pgp = pgPromise();
let db;
  
try{
    db = pgp({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    console.log("Database connected successfully");
}
catch(err){
    console.error('Error connecting to the database:', error.message);
}




export default db;