//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';


//1. Get all the companies
async function getCompanies(req, res){
    try {
        const companies = await db.any('SELECT * FROM company');
        res.json(companies); //returns json format to frontend
        console.log(companies); 
    }
    catch(error){
        console.error('Error fetching company names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}




export default {getCompanies};