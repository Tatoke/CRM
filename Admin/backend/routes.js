//We define various routes (endpoints) for handling different HTTP methods (GET, POST, PUT, DELETE) related to clients, then orders, then services, etc. resources.
//watch video from notes.txt
import express from 'express';
const router = express.Router();
//IMPORT CONTROLLERS:
import clientController from './src/controllers/clientController.js';  //set of functions to work with Clients table
import employeeController from './src/controllers/employeeController.js';  //set of functions to work with employees
import companyController from './src/controllers/companyController.js';
import orderController from './src/controllers/orderController.js';





//TEST:
router.get('/', (req, res) => {       //type http://localhost:3000/ in address line in a browser to check the response
    res.send('Home page (backend)');
});





//!!!Use RESTful API rules to come up with endpoints' names
//----------------CLIENT endpoints--------------------
//router.get('/clients', clientController.getClients);    //when " http://localhost:3000/clients" route is called -> getClients() function from userController.js file will be executed
//router.get('/clients/:clientId', clientController.getClientById); 
router.get('/client', clientController.getClient);  //get client by id, or fname, or lname.
router.post('/clients', clientController.addNewClient);  //add new client to database (AddClientModal.jsx)



//----------------EMPLOYEE endpoints (need this?)--------------------
router.post('/employee/login', employeeController.loginEmployee); 
router.post('/employee/logout', employeeController.logoutEmployee); 


//----------------Company endpoints--------------------
router.get('/companies', companyController.getCompanies); //lists all company names



//----------------Order endpoints--------------------
router.get('/order', orderController.getOrder); //get order by id, name, client, status etc (Dashboard)
router.post('/orders', orderController.addNewOrder);  //add new order to database 






export default router;