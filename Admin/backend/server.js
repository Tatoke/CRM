import express from 'express';
import pgPromise from 'pg-promise'; //lib to work with db; returns data in js - array of objects
import dotEnv from 'dotenv';

dotEnv.config(); //process.env object has variables from .env file





//---------CONNECTING TO DB SERVER (SUPABASE):----------------------
const pgp = pgPromise();
let db;
let connectionUrl=process.env.CONNECTION_URL_SUPABASE;   

try{
    db = pgp(connectionUrl);
    console.log("Database connected successfully");
}
catch(err){
    console.error('Error connecting to the database:', error.message);
}
//------------------------------------------------------





//START SERVER:
const app = express();
const port = 3000; 

//-------MIDDLEWARE (placement of this matters!)---------
app.use(express.json());  //same as body-parser (used to parse incoming JSON requests eg get data from inout fields,  and make the parsed data available in the request.body object )
//-------------------------------------------------------








// ------------ROUTES (endpoints):------------------------
app.get('/', (req, res) => {       //type http://localhost:3000/ in address line in a browser to check the response
 res.send('Home page (backend)');
});



//!!"/users" is an endpoint. Url in address line would look like: http://localhost:3000/users. Use RESTful API principles to come up with endpoints
//Get users:
app.get("/users", async (req, res) =>{ 
    try {
        const users = await db.any('SELECT * FROM users');
        res.json(users); //returns json format
        console.log(users); 

    }
    catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})












// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});