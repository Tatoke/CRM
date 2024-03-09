//actual logic for handling employee routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';




//1
async function loginEmployee(req, res){  //how Oauth library works??
    const {username, password} = req.body;
    //...to be continued

}

//2
async function logoutEmployee(req, res){
     //...to be continued
}




//JUSTIN:
//3. Enpoint passed form frontedn: 'employees/:employeeId
//gets all info about particular employee and orders that he works on (for Profile page)
async function getEmployeeOrderInfo(req, res){
    const employeeId = req.params.employeeId; //passed from 'employees/:employeeId'
    try {
        const employee = await db.any('SELECT * FROM employee WHERE employeeId = $1', [employeeId]);
        res.json(employee); //returns json format to frontend
        console.log(employee); 
    }
    catch(error){
        console.error('Error fetching status names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//3 Get employee by id, or by fname , or by lname, or combination of those
async function getEmployee(req, res){
    try {
        let {employeeId, employeeFirstName, employeeLastName}=req.query; // Extract query parameters from the request
        console.log(employeeId);

        //CONSTRUCTING A QUERY:
        let conditions=[];  //used to create dynamic query later;  Construct a query based on the provided parameters
        if(employeeId)  conditions.push('employeeid = $1');
        if (employeeFirstName) conditions.push('fname = $2');
        if (employeeLastName) conditions.push('lname = $3');

         // Construct the WHERE clause using the conditions array
         const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
         const query = `SELECT fname, lname, employeeid, email, phone, province, city FROM employee ${whereClause}`; // Construct the query
         console.log(query);

        const employee = await db.any(query, [employeeId, employeeFirstName, employeeLastName]);
        res.json(employee); 
        console.log(employee); 
    }

    catch(error){
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//4. Function to add new employee to 'employee' table:
async function addNewEmployee(req, res){
    try {
        const newEmployeeData = req.body; 

        // Get the current maximum employeeid
        const maxEmployeeId = await db.one('SELECT MAX(employeeid) FROM employee');

        // Increment the employeeid by 1
        const newEmployeeId = maxEmployeeId.max + 1;
        
        // Insert new employee data into the client table
        await db.none('INSERT INTO employee (employeeid, fname, mname, lname, phone, email, city, province) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                       [newEmployeeId, newEmployeeData.fName, newEmployeeData.mName, newEmployeeData.lName, newEmployeeData.phone, newEmployeeData.email, newEmployeeData.city, newEmployeeData.province]);
        
        res.status(201).json({ message: 'Employee added successfully', data: newEmployeeData });

      } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Failed to add employee' });
      }
}

async function deleteEmployee(req, res) {
    const { id } = req.params;
  
    try {
      const result = await db.result('DELETE FROM employee WHERE employeeid = $1', [id]);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Employee deleted successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


export default {loginEmployee,logoutEmployee, getEmployeeOrderInfo, getEmployee, addNewEmployee, deleteEmployee};