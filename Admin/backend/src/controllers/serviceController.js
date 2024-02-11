//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';



//1. Gets a list of all status names from status table (for Dashboard select-option)
async function getServices(req, res){
    try {
        const services = await db.any('SELECT * FROM service');
        res.json(services); //returns json format to frontend
        //console.log(services); 
    }
    catch(error){
        console.error('Error fetching status services:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export default {getServices};