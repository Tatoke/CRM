//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';





//1. add NEW update under LAST Milestone (whose 'activesince' is the lastest out of all the milestones for the particular order):
async function addUpdate(req, res){
    const { updateToAddToTimeline, loggedInEmpId, orderId} = req.body;         //{updateToAddToTimeline: { title, description},loggedInEmpId, orderId}
    //console.log("new update data passed to backend :" + updateToAddToTimeline.title + " and employee #" +loggedInEmpId );

    

    //Getting last active milestone:
    //Return last active milestone  to add update to
    const milestoneIdLastActive = await db.one('SELECT milestoneid FROM milestone WHERE activesince IS NOT NULL AND orderid = $1 ORDER BY activesince DESC, activesince DESC LIMIT 1', [orderId]);
    //console.log("Last active milestone to add update to: " +milestoneIdLastActive);



    db.one('INSERT INTO "update" (milestoneid, empid, title, details, activesince) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING updateid', [milestoneIdLastActive.milestoneid, loggedInEmpId,  updateToAddToTimeline.title, updateToAddToTimeline.description])
    .then(result => {
        //console.log('New update added:', result);
        res.status(200).json({ message: 'Update added successfully' });
    })
    .catch(error => {
        console.error('Error adding new update:', error);
    });

}





//2.Get all the milestones and updates for timeline for a particular order
async function getUpdates(req, res){
    let orderId =req.query.orderId;


    //get milestones with activesince and all the updates 
    const query = `
    SELECT milestoneid AS id, name, activesince, 'Milestone' AS type, NULL AS details, NULL AS empid, NULL as fname, NULL AS lname, ordermilestonenumber, orderid
    FROM milestone
    WHERE activesince IS NOT NULL AND orderid=$1
    
    UNION ALL
    
    SELECT u.updateid AS id, u.title, u.activesince, 'Update' AS type, u.details, u.empid, e.fname, e.lname, NULL AS ordermilestonenumber, m.orderid
    FROM "update" AS u INNER JOIN employee AS e ON u.empid=e.employeeid INNER JOIN milestone AS m ON m.milestoneid=u.milestoneid INNER JOIN	"order" AS o ON o.orderid=m.orderid WHERE m.orderid=$1  
    
    ORDER BY activesince DESC;
    `;



    db.manyOrNone(query, [orderId])
        .then(timelineData => {
            res.json(timelineData);
            console.log(`Updates in backend for orderId : ${orderId} `, timelineData);
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' })
            console.error('Error selecting updates:', error);
        });

}




export default {addUpdate, getUpdates};