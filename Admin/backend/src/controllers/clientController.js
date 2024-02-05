//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';



//1
async function getClients(req, res){
    try {
        const clients = await db.any('SELECT * FROM client');
        res.json(clients); //returns json format
        console.log(clients); 
    }
    catch(error){
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


//2
async function getClientById(req,res){
    try {
        let clientId = req.params.clientId;

        const client = await db.oneOrNone('SELECT * FROM client WHERE clientid = $1', clientId);
        res.json(client); //returns json format
        console.log(client); 
    }
    catch(error){
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}













export default {getClients, getClientById};