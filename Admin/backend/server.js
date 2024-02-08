import express from 'express';
import router from "./routes.js"    
import cors from 'cors';
//NEED TO KEEP THIS FILE AS CLEAN AS POSSIBLE




const app = express();
const port = 3000; 

//-------MIDDLEWARE (placement of this matters!)---------
app.use(express.json());  //same as body-parser (used to parse incoming JSON requests eg get data from inout fields,  and make the parsed data available in the request.body object )
app.use(cors()); // !Enable CORS for all routes (allows for frontend to connect to backend from any port, like 5173)




//-------USING ROUTES from routes.jsx -------------------
app.use('/', router); //renders home page
//app.use("/clients", router); //render all clients
app.use("/client", router); //find 1 client (by ir, or name, or l name)
//app.use("/clients/:clientId", router);

















// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});