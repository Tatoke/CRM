//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';



//1. Gets a list of all status names from status table (for Dashboard select-option)
async function getServices(req, res){
    try {
        const services = await db.any('SELECT * FROM service');
        res.json(services); //returns json format to frontend
        //console.log("Services in backend:" +services); 
    }
    catch(error){
        console.error('Error fetching status services:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}



//2. Add new service
async function addNewService(req, res){
    const { name, description, image } = req.body;
    const imageData = Buffer.from(image, 'base64');
    console.log("My new service: " + imageData);


 const newService = db.none('INSERT INTO service(name, description, image) VALUES($1, $2, $3)', [name, description, imageData])
  .then(() => {
    res.status(200).json(newService);
    console.log('Service inserted successfully');
  })
  .catch((error) => {
    res.status(500).send('Error inserting new service');
    console.error('Error inserting service:', error);
  });



}




export default {getServices, addNewService};