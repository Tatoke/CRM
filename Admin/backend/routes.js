//We define various routes (endpoints) for handling different HTTP methods (GET, POST, PUT, DELETE) related to clients, then orders, then services, etc. resources.
//watch video from notes.txt
import express from 'express';
const router = express.Router();
//IMPORT CONTROLLERS:
import clientController from './src/controllers/clientController.js';  //set of functions to work with Clients table
import employeeController from './src/controllers/employeeController.js';  //set of functions to work with employees
import companyController from './src/controllers/companyController.js';
import orderController from './src/controllers/orderController.js';
import statusController from './src/controllers/statusController.js';
import serviceController from './src/controllers/serviceController.js';
import billingController from './src/controllers/billingController.js';




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
router.get("/clients/:clientId", clientController.getClientCompanyOrderListInfo); //gets client, company, order list info for client profile page


//----------------EMPLOYEE endpoints (need this?)--------------------
//router.post('/employee/login', employeeController.loginEmployee); 
//router.post('/employee/logout', employeeController.logoutEmployee); 
router.get('employees/:employeeId', employeeController.getEmployeeOrderInfo); //gets all info about particular employee and orders that he works on (for Profile page)



//----------------Company endpoints--------------------
router.get('/companies', companyController.getCompanies); //lists all company names



//----------------Order endpoints--------------------
router.get('/order', orderController.getOrder); //get order by id, name, client, status etc (Dashboard, OrderDetails pages)
router.post('/orders', orderController.addNewOrder);  //add new order to database 
router.get('/billing/:orderId', billingController.getOrderBilling); //billing info about particular order
router.get('timeline/:orderId', orderController.getOrderTimeline); //gets milestones + updates + employees who  made updates with dates for an orderId
router.get('/order/:orderId', orderController.getOrderDetails); //gets order details (id, client, status, service type, userEmail for request info modal)
router.put('/order/:orderId/status', orderController.updateOrderStatus);  












//----------------STATUS endpoints--------------------
router.get('/statuses', statusController.getStatuses); //lists all statuses (Dashboard select-option )


//----------------SERVICE endpoints--------------------
router.get('/services', serviceController.getServices); //lists all statuses (Dashboard select-option )







export default router;