//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';





//1. Get order by name, id, service, status, client name - any of these   (Dashboard page)
async function getOrder(req, res){
    try {
        let {orderId, orderName, clientName, serviceType, status}=req.query; // Extract query parameters from the request
        
        //console.log(orderId + " " + orderName +" " + clientName);
        orderName=orderName.toLowerCase(); clientName=clientName.toLowerCase(); serviceType=serviceType.toLowerCase();  status=status.toLowerCase();
        //CONSTRUCTING A QUERY:
        let conditions=[];  //used to create dynamic query later;  Construct a query based on the provided parameters
        let fName, lName;

        if(orderId)  conditions.push('o.orderid = $1');
        if (orderName) conditions.push('LOWER(o.name) = $2');
        if (clientName) {
            let substringsArray = clientName.split(' ');
            fName=substringsArray[0];
            lName=substringsArray[1];

            conditions.push('LOWER(c.fname) = $3');
            conditions.push('LOWER(c.lname) = $4');
        }
        if (serviceType) conditions.push('LOWER(s.name) = $5');
        if (status) conditions.push('LOWER(st.name) = $6');



         // Construct the WHERE clause using the conditions array
         const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
         const query = `SELECT o.orderid, o.name AS orderName, c.clientid, c.fname, c.lname, s.name AS serviceName, st.name AS statusName,  SUM(i.amountdue) - COALESCE(SUM(r.amountpaid), 0) AS balance, o.createdat
         FROM 
         "order" o INNER JOIN client c ON o.clientid = c.clientid
         INNER JOIN status st ON o.statusid = st.statusId
         INNER JOIN service s ON o.serviceid = s.serviceid
         LEFT JOIN invoice i ON o.orderid = i.orderid
         LEFT JOIN receipt r ON i.invoiceid = r.invoiceid
         ${whereClause}
         GROUP BY o.orderid, o.name, c.clientid, c.fname, c.lname, s.name, st.name, o.createdat
         `; // Construct the query
        console.log(query);

        const order = await db.any(query, [orderId, orderName, fName, lName, serviceType, status ]);
        res.json(order); 
        console.log(order); 
    }
    catch(error){
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}









//2.Adding new order to db with it's milestones. (Dahboard -> AddNewOrderModal)
async function addNewOrder(req, res){
    try {
        const { orderName, clientId, milestones, serviceType } = req.body; // Extract data about order (from frontend) passed from a form
       
        
        // Insert data into the order table
        const newOrder = await db.one(
          'INSERT INTO "order" (clientId, name, serviceid, statusid, balance) VALUES ($1,$2,$3,$4,$5) RETURNING orderid',
          [clientId, orderName, serviceType, 2, 0.00]
        );



        //POPULATING MILESTONES FOR THIS ORDER:
        const orderId = newOrder.orderid; // Get the orderId of the newly inserted order
        // Insert milestones into the milestone table for the order
        //by default, milestones are assigned to an order, non of them are active unless added to timeline -> all milestones for the order are set to iscurrentmilestone=false
        //startedat = null for all milestones at the creating of an order. Neeed to add milestone to timeline to make the milestone active
        const milestoneInsertPromises = milestones.map((milestone, index) => {
          return db.none(
            'INSERT INTO milestone (orderid, name, ordermilestonenumber) VALUES ($1, $2, $3)',
            [orderId, milestone, index+1]
          );
        });
    
        // Wait for all milestone insertions to complete
        await Promise.all(milestoneInsertPromises);
    

    
        res.status(201).json({ message: 'Order added successfully' });
    } 
    catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ error: 'Failed to add order' });
    }
    
}



//3. Get all orders
async function getAllOrders(req, res){ //gets milestones + updates + employees who  made updates with dates for an orderId
    try {
        const data = await db.any(`SELECT * FROM "order"`);
        
        res.json(data);
        console.log(data);

    } catch (err) {
        console.error('Error fetching order details info:', err);
        res.status(500).json({ err: 'Internal Server Error: could not fetch order details' });
    }
}





//4.
async function getOrderTimeline(req, res){ //gets milestones + updates + employees who  made updates with dates for an orderId
    const orderId = req.params.orderId;
}


//5. Order Details page - Order Details box: (order id, order name, client name, id, service, status)
async function getOrderDetails(req, res){ //gets order details (id, client, status, service type, userEmail for request info modal)
    const orderId = req.params.orderId;


    try {
        const query = `SELECT o.orderid, o.name, client.clientid, client.fname, client.lname, o.createdat, service.name AS servicename, status.name AS statusname FROM "order" o INNER JOIN client ON o.clientid=client.clientid 
        INNER JOIN  service ON service.serviceid=o.serviceid INNER JOIN status ON status.statusid=o.statusid WHERE orderId = $1`;
        const orderDetailsData = await db.one(query, orderId);  // Execute the query with orderId as a parameter
        
        res.json(orderDetailsData);
        //console.log(orderDetailsData);

    } catch (err) {
        console.error('Error fetching order details info:', err);
        res.status(500).json({ err: 'Internal Server Error: could not fetch order details' });
    }
    
}



//6. Order Details page - Update order status 
async function updateOrderStatus(req, res){
    const { status } = req.body; //statusName
    const orderId = req.params.orderId;

    // console.log(orderId);//12
    // console.log(status);// To Do
    try {
        const statusId = await db.oneOrNone('SELECT statusid FROM status WHERE name = $1', [status]);
        
        if (!statusId) {
          return res.status(404).json({ error: 'Status not found' });
        }
    
        // Update the order status in the database
        await db.none('UPDATE "order" SET statusid = $1 WHERE orderid = $2', [statusId.statusid, orderId]);
    
        res.json({ message: 'Order status was updated' });
      } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


//7. Delete order by orderId:
async function deleteOrderById(req, res){
    let orderId = req.params.orderId;
    //console.log("order id to be deleted:" + orderId);


    db.none('DELETE FROM "order" WHERE orderid = $1', [orderId])    //deleted on cascade -> milestones and updates automatically deleted
    .then(() => {
        console.log('Order #'  + orderId + "deleted successfully");
        res.json({ success: true, message: 'Order deleted successfully' });
    })
    .catch(error => {
        console.error('Error deleting order #' + orderId, error);
        res.status(500).json({ success: false, message: 'Failed to delete order' });
    });



}



export default {getOrder, addNewOrder, getOrderDetails, getOrderTimeline, updateOrderStatus, deleteOrderById, getAllOrders};