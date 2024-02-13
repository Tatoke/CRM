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

}





export default {loginEmployee,logoutEmployee, getEmployeeOrderInfo};