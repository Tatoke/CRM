//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';



// //1
// async function getClients(req, res){
//     try {
//         const clients = await db.any('SELECT * FROM client');
//         res.json(clients); //returns json format
//         console.log(clients); 
//     }
//     catch(error){
//         console.error('Error fetching clients:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }


// //2
// async function getClientById(req,res){
//     try {
//         let clientId = req.params.clientId;

//         const client = await db.oneOrNone('SELECT * FROM client WHERE clientid = $1', clientId);
//         res.json(client); //returns json format
//         console.log(client); 
//     }
//     catch(error){
//         console.error('Error fetching client:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// }





//3 Get client by id, or by fname , or by lname, or combination of those
async function getClient(req, res){
    try {
        let {clientId, clientFirstName, clientLastName}=req.query; // Extract query parameters from the request
        console.log(clientId);

        //CONSTRUCTING A QUERY:
        let conditions=[];  //used to create dynamic query later;  Construct a query based on the provided parameters
        if(clientId)  conditions.push('clientid = $1');
        if (clientFirstName) conditions.push('fname = $2');
        if (clientLastName) conditions.push('lname = $3');

         // Construct the WHERE clause using the conditions array
         const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
         const query = `SELECT fname, lname, clientid, email, phone, province, city FROM client ${whereClause}`; // Construct the query
         console.log(query);

        const client = await db.any(query, [clientId, clientFirstName, clientLastName]);
        res.json(client); 
        console.log(client); 
    }

    catch(error){
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}











export default {getClient};