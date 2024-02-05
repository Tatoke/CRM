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










export default {loginEmployee,logoutEmployee};