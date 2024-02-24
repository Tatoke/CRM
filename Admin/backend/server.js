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
app.use('/receipt', router); //fetch the receipt table
app.use('/invoice', router); //fetch the invoice table
app.use('/invoices', router); // add new invoice to database
app.use('/receipts', router); // add new receipt to database
app.use('/receipts/:id', router); // delete receipt using receiptid from database
app.use('/invoices/:id', router); // delete invoice using invoiceid from database
app.use('/billing/:orderId', router); //billing info about particular order
app.use('/timeline/:orderId', router); //gets milestones + updates + employees who  made updates with dates for an orderId
app.use('/order/:orderId', router); //gets order details (id, client, status, service type, userEmail for request info modal)



app.use('/employees/:employeeId', router); //gets all info about particular employee and orders that he works on (for Profile page)
app.use('/clients/:clientId', router); //gets client, company, order list info for client profile page

app.use('/order/:orderId/status', router); //updates order status


app.use('/orders/:orderId/milestones', router);  
app.use('/milestones/:milestoneId', router); 
app.use('/updates', router); //add new update to Update table (or select all updates)
app.use('/orders/:orderId', router); //delete otder by id
app.use('/services', router);   //add new service to table



// Start the server
app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});