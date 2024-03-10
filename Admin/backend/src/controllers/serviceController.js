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



//2. Add new service, get serviceId of the new added service and keep the image uploaded in server file system (image file's name has serviceId in it)
async function addNewService(req, res){
    const { name, description} = req.body;
    //const image = req.file;

    console.log("My new service name and description: " + name + " " + description );
    //console.log("Service image:" +image);

    


  try {
   
    //1. Add new service to database (without image)
    const newServiceId = await db.one(
      'INSERT INTO service(name, description) VALUES($1, $2) RETURNING serviceId', [name, description]
    );

    res.status(200).json({ newServiceId });
    console.log('Service inserted successfully with ID:', newServiceId);


     

  } catch (error) {
    res.status(500).send('Error inserting new service');
    console.error('Error inserting service:', error);
  }

}





//3. Edit existing service
async function editService(req, res){
  const serviceId = req.params.serviceId;
  const {image, name, description} = req.body;


  try {
    // Update the service in the database
    await db.none('UPDATE service SET name = $1, description = $2 WHERE serviceId = $3', [name, description, serviceId]);

    console.log('Service updated successfully');
    res.status(200).json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Error updating service' });
  }

}




//4. Delete service
async function deleteService(req, res){
  const serviceId = req.params.serviceid;
  
  db.none('DELETE FROM "service" WHERE serviceid = $1', [serviceId])    //deleted on cascade -> milestones and updates automatically deleted
    .then(() => {
        console.log('Service #'  + serviceId + "deleted successfully");
        res.json({ success: true, message: 'Service deleted successfully' });
    })
    .catch(error => {
        console.error('Error deleting service #' + serviceId, error);
        res.status(500).json({ success: false, message: 'Failed to delete service' });
    });

}



export default {getServices, addNewService, editService, deleteService};