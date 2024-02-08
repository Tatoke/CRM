//We define various routes (endpoints) for handling different HTTP methods (GET, POST, PUT, DELETE) related to clients, then orders, then services, etc. resources.
//watch video from notes.txt
import express from 'express';
const router = express.Router();
//IMPORT CONTROLLERS:
import clientController from './src/controllers/clientController.js';  //set of functions to work with Clients table
import employeeController from './src/controllers/employeeController.js';  //set of functions to work with employees







//TEST:
router.get('/', (req, res) => {       //type http://localhost:3000/ in address line in a browser to check the response
    res.send('Home page (backend)');
});





//!!!Use RESTful API rules to come up with endpoints' names
//----------------CLIENT endpoints--------------------
//router.get('/clients', clientController.getClients);    //when " http://localhost:3000/clients" route is called -> getClients() function from userController.js file will be executed
//router.get('/clients/:clientId', clientController.getClientById); 
router.get('/client', clientController.getClient);  //get client by id, or fname, or lname.




//----------------EMPLOYEE endpoints (need this?)--------------------
router.post('/employee/login', employeeController.loginEmployee); 
router.post('/employee/logout', employeeController.logoutEmployee); 












export default router;