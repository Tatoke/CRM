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
import milestoneController from './src/controllers/milestoneController.js'
import updateController from './src/controllers/updateController.js';



//TEST:
router.get('/', (req, res) => {       //type http://localhost:3000/ in address line in a browser to check the response
    res.send('Home page (backend)');
});





//!!!Use RESTful API rules to come up with endpoints' names
//----------------CLIENT endpoints--------------------
//router.get('/clients', clientController.getClients);    //when " http://localhost:3000/clients" route is called -> getClients() function from userController.js file will be executed
router.get('/client/:clientId', clientController.getClientById); 
router.get('/client', clientController.getClient);  //get client by id, or fname, or lname.
router.post('/clients', clientController.addNewClient);  //add new client to database (AddClientModal.jsx)
router.get("/clients/:clientId", clientController.getClientCompanyOrderListInfo); //gets client, company, order list info for client profile page


//----------------EMPLOYEE endpoints (need this?)--------------------
//router.post('/employee/login', employeeController.loginEmployee); 
//router.post('/employee/logout', employeeController.logoutEmployee); 
router.get('/employee/:employeeId', employeeController.getEmployeeOrderInfo); //gets all info about particular employee and orders that he works on (for Profile page)
router.get('/employee', employeeController.getEmployee);  //get employee by id, or fname, or lname.
router.post('/employees', employeeController.addNewEmployee);  //add new employee to database
router.delete('/employees/:id', employeeController.deleteEmployee); // delete employee using employeeid from database


//----------------Company endpoints--------------------
router.get('/companies', companyController.getCompanies); //lists all company names



//----------------Order endpoints--------------------
router.get('/order', orderController.getOrder); //get order by id, name, client, status etc (Dashboard, OrderDetails pages)
router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.addNewOrder);  //add new order to database 
router.get('/billing/:orderId', billingController.getOrderBilling); //billing info about particular order
router.get('timeline/:orderId', orderController.getOrderTimeline); //gets milestones + updates + employees who  made updates with dates for an orderId
router.get('/order/:orderId', orderController.getOrderDetails); //gets order details (id, client, status, service type, userEmail for request info modal)
router.put('/order/:orderId/status', orderController.updateOrderStatus);  //fetch all milestones for a particular orderId (timeline select-option)
router.delete('/orders/:orderId', orderController.deleteOrderById); 


//----------------Billing endpoints--------------------
router.get('/receipt', billingController.getReceipts); //fetch the receipt table
router.get('/invoice', billingController.getInvoices); //fetch the invoice table
router.post('/invoices', billingController.addNewInvoice); // add new invoice to database
router.post('/receipts', billingController.addNewReceipt); // add new receipt to database
router.delete('/receipts/:id', billingController.deleteReceipt); // delete receipt using receiptid from database
router.delete('/invoices/:id', billingController.deleteInvoice); // delete invoice using invoiceid from database


//----------------Milestone endpoints--------------------
router.get('/orders/:orderId/milestones', milestoneController.getMilestonesForOrder);  
router.patch('/milestones/:milestoneId', milestoneController.activateMilestoneStatus);   //timeline - when add milestone button pushed -> activate milestone in database to display later on timeline



//----------------Update endpoints--------------------
router.post('/updates', updateController.addUpdate);
router.get('/updates', updateController.getUpdates); 





//----------------STATUS endpoints--------------------
router.get('/statuses', statusController.getStatuses); //lists all statuses (Dashboard select-option )


//----------------SERVICE endpoints--------------------
router.get('/services', serviceController.getServices); //lists all statuses (Dashboard select-option )
router.post('/services', serviceController.addNewService); 






export default router;