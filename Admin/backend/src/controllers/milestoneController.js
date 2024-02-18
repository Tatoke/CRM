//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';





//1.  fetch all milestones for a particular orderId   (select-option in order timeline form)
async function getMilestonesForOrder(req, res) {
    const orderId = req.params.orderId;
  

    try {
        const milestones = await db.any('SELECT milestoneid, name, ordermilestonenumber, activesince FROM milestone WHERE orderid=$1 ', orderId);
        res.json(milestones); 
        //console.log(milestones); 
      } 
      catch (error) {
        console.error('Error fetching milestones:', error);
        throw error;
    }
}





//2. set 'activesince' for an added to timeline Milestone  (timeline add milestone functionality) and return 
async function activateMilestoneStatus(req, res){
    let milestoneId = req.body.milestoneToMakeActive;
    console.log("milestone id to make active::" +milestoneId); //undefined 
   
    try {
        await db.none('UPDATE milestone SET activesince=CURRENT_TIMESTAMP WHERE milestoneid = $1', [milestoneId]);
        //console.log('Milestone isactiveontimeline status updated successfully');

    } catch (error) {
        console.error('Error updating milestone status:', error);
        throw error;
    }
}







export default {getMilestonesForOrder, activateMilestoneStatus}
