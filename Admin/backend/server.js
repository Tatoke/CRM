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
app.use("/client", router); //find 1 client (by id, or name, or l name)
app.use("/order", router );  //find 1 order (by id, or name, or client name, service, status) - Dashboard page
app.use("/orders", router ); //add new order to db (add new order modal)
//app.use("/clients/:clientId", router);
app.use('/companies',router ); //lists all the companies (used in addNewClientModal)
app.use('/clients', router);   //add new client to the client table
app.use('/statuses', router); //select all the statuses from status table (Dashboard page select-option)
app.use('/services', router)  //select all the services from service table (Dashboard page select-option)

app.use('/billing/:orderId', router); //billing info about particular order
app.use('/timeline/:orderId', router); //gets milestones + updates + employees who  made updates with dates for an orderId
app.use('/order/:orderId', router); //gets order details (id, client, status, service type, userEmail for request info modal)



app.use('/employees/:employeeId', router); //gets all info about particular employee and orders that he works on (for Profile page)
app.use('/clients/:clientId', router); //gets client, company, order list info for client profile page










// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});