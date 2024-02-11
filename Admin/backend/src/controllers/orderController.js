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
         const query = `SELECT o.orderid, o.name AS orderName, c.fname, c.lname, s.name AS serviceName, st.name AS statusName, o.balance, o.createdat
         FROM 
         "order" o INNER JOIN client c ON o.clientid = c.clientid
         INNER JOIN status st ON o.statusid = st.statusId
         INNER JOIN service s ON o.serviceid = s.serviceid  ${whereClause}`; // Construct the query
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






//2.Adding new order to db (Dahboard -> AddNewOrderModal)
async function addNewOrder(req, res){
    
}



//3.
async function getOrderBilling(req, res){
}



//4.
async function getOrderTimeline(req, res){
}

//5. 
async function getOrderDetails(req, res){ 
    
    

}




export default {getOrder, addNewOrder, getOrderDetails};