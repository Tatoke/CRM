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

async function getReceipts(req, res) {
    try {
        const { fromDate, toDate, transactionId, clientId, orderId } = req.query;

        const conditions = [];
        if (fromDate) conditions.push('r.paymentdate >= $1');
        if (toDate) conditions.push('r.paymentdate <= $2');
        if (transactionId) conditions.push('r.receiptid = $3');
        if (clientId) conditions.push('c.clientid = $4');
        if (orderId) conditions.push('o.orderid = $5');

        const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
        const query = `
            SELECT 
                r.receiptid,
                r.invoiceid,
                o.orderid,
                c.clientid,
                c.fname,
                c.lname,
                r.amountpaid,
                r.attachment,
                r.paymentdate
            FROM 
				invoice i
			LEFT JOIN 
				receipt r ON i.invoiceid = r.invoiceid
			LEFT JOIN 
				"order" o ON i.orderid = o.orderid
			LEFT JOIN 
				client c ON o.clientid = c.clientid
            ${whereClause}
            ORDER BY r.receiptid
        `;

        const receipt = await db.any(query, [fromDate, toDate, transactionId, clientId, orderId]);
        res.json(receipt);
    } catch (error) {
        console.error('Error fetching receipts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getInvoices(req, res) {
    try {
        const { fromDate, toDate, transactionId, clientId, orderId } = req.query;

        const conditions = [];
        if (fromDate) conditions.push('i.invoicedate >= $1');
        if (toDate) conditions.push('i.invoicedate <= $2');
        if (transactionId) conditions.push('i.invoiceid = $3');
        if (clientId) conditions.push('c.clientid = $4');
        if (orderId) conditions.push('o.orderid = $5');

        const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
        const query = `
            SELECT 
                i.invoiceid,
                o.orderid,
                c.clientid,
                c.fname,
                c.lname,
                i.amountdue,
                i.attachment,
                i.invoicedate,
                i.duedate
            FROM 
                "order" o
            INNER JOIN 
                client c ON o.clientid = c.clientid
            LEFT JOIN 
                invoice i ON o.orderid = i.orderid
            ${whereClause}
            ORDER BY i.invoiceid
        `;

        const invoice = await db.any(query, [fromDate, toDate, transactionId, clientId, orderId]);
        res.json(invoice);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function addNewInvoice(req, res){
    try {
        const newInvoiceData = req.body; 
        
        // Insert new client data into the client table
        await db.none('INSERT INTO invoice (orderid, duedate, invoicedate, amountdue, attachment) VALUES ($1, $2, $3, $4, $5)',
                       [newInvoiceData.orderID, newInvoiceData.dueDate, newInvoiceData.invoiceDate, newInvoiceData.amount, newInvoiceData.attachments]);
        
        res.status(201).json({ message: 'Invoice added successfully', data: newInvoiceData });

      } catch (error) {
        console.error('Error adding Invoice:', error);
        res.status(500).json({ message: 'Failed to add Invoice' });
      }
}

async function addNewReceipt(req, res){
    try {
        const newReceiptData = req.body; 
        
        // Insert new client data into the client table
        await db.none('INSERT INTO receipt (invoiceid, paymentdate, amountpaid, attachment) VALUES ($1, $2, $3, $4)',
                       [newReceiptData.invoiceID, newReceiptData.paymentDate, newReceiptData.amount, newReceiptData.attachments]);
        
        res.status(201).json({ message: 'Receipt added successfully', data: newReceiptData });

      } catch (error) {
        console.error('Error adding Receipt:', error);
        res.status(500).json({ message: 'Failed to add Receipt' });
      }
}

async function deleteReceipt(req, res) {
    const { id } = req.params;
  
    try {
      const result = await db.result('DELETE FROM receipt WHERE receiptid = $1', [id]);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Receipt deleted successfully' });
      } else {
        res.status(404).json({ error: 'Receipt not found' });
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async function deleteInvoice(req, res) {
    const { id } = req.params;
  
    try {
      const result = await db.result('DELETE FROM invoice WHERE invoiceid = $1', [id]);
  
      if (result.rowCount === 1) {
        res.json({ message: 'Invoice deleted successfully' });
      } else {
        res.status(404).json({ error: 'Invoice not found' });
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

export default { getOrderBilling, getReceipts, getInvoices, addNewInvoice, addNewReceipt, deleteReceipt, deleteInvoice };


