//actual logic for handling client routes is typically implemented in the corresponding controller file
import db from '../configs/database.js';
//functions to deal with INVOICE and RECEIPT tables





//1. Get receipts and invoices for an orderId
async function getOrderBilling(req, res){ //gets only billing info about an orderId 
    const orderId = req.params.orderId;
    //console.log(orderId);
   

    try {
        const query = `SELECT * FROM invoice LEFT JOIN receipt ON invoice.invoiceid=receipt.invoiceid WHERE invoice.orderId = $1`;
        const orderBillingData = await db.any(query, orderId);  // Execute the query with orderId as a parameter
        
        res.json(orderBillingData);

    } catch (err) {
        console.error('Error fetching order billing info:', err);
        res.status(500).json({ err: 'Internal Server Error: could not fetch billing about the order' });
    }
    
}



export default { getOrderBilling};