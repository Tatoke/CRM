import express from 'express';
import db from './database.js'


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