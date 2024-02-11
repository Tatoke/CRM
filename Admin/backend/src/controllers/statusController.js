//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';



//1. Gets a list of all status names from status table (for Dashboard select-option)
async function getStatuses(req, res){
    try {
        const statuses = await db.any('SELECT * FROM status');
        res.json(statuses); //returns json format to frontend
        //console.log(statuses); 
    }
    catch(error){
        console.error('Error fetching status names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


export default {getStatuses};