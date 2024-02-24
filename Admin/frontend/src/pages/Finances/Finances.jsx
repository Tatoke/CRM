import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Finances.css';
import AddTransactionModal from '../../components/AddTransaction_modal/AddTransactionModal.jsx';
import DeleteTransactionModal from '../../components/DeleteTransaction_modal/DeleteTransactionModal.jsx';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Finances(props) {
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false);
  const [deleteModalProps, setDeleteModalProps] = useState({ show: false });
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    transactionId: '',
    clientId: '',
    orderId: '',
    type: '',
  });

  function openModal() {
    setShowAddTransactionDialog(true);
  }

  function closeModal() {
    setShowAddTransactionDialog(false);
  }

  const getEndpointBasedOnType = (type) => {
    if (type === 'Receipt') {
      return 'receipt';
    } else if (type === 'Invoice') {
      return 'invoice';
    } else {
      return '';
    }
  };

  const fetchData = async () => {
    const endpoint = getEndpointBasedOnType(formData.type);

    if (endpoint) {
      try {
        const response = await fetch(
          `http://localhost:3000/${endpoint}/?fromDate=${formData.fromDate}&toDate=${formData.toDate}&transactionId=${formData.transactionId}&clientId=${formData.clientId}&orderId=${formData.orderId}`
        );

        const data = await response.json();
        setResponseData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    } else {
      // Handle the case where type is not "Receipt" or "Invoice"
      console.error('Invalid type selected:', formData.type);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect to fetch data when type changes
  useEffect(() => {
    fetchData();
  }, [formData.type]);

  // useEffect to reset form data when type changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fromDate: '',
      toDate: '',
      transactionId: '',
      clientId: '',
      orderId: '',
    }));
  }, [formData.type]);

  
  const handleDelete = async (id) => {
    try {
      const endpoint = getEndpointBasedOnType(formData.type);
      // Open the DeleteTransactionModal with the appropriate props
      setDeleteModalProps({
        show: true,
        transactionId: id,
        onDelete: async () => {
          const response = await fetch(`http://localhost:3000/${endpoint}s/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete ${formData.type}: ${errorMessage}`);
          }
  
          console.log(`${formData.type} deleted successfully`);
          // After deletion, fetch data again
          fetchData();
        },
        closeModal: () => {
          setDeleteModalProps({ ...deleteModalProps, show: false });
        },
      });
    } catch (err) {
      console.error(`Error deleting ${formData.type}:`, err.message);
    }
  };
  

  return (
    <div className="page-layout">
      <h4>Finances</h4>

      <form className="finances-form" onSubmit={handleSubmit}>
        <div className="left">
          <input type="date" name="fromDate" id="fromDate" value={formData.fromDate} onChange={handleChange}></input>
          <input type="date" name="toDate" id="toDate" value={formData.toDate} onChange={handleChange}></input>
          <input
            type="text"
            name="transactionId"
            id="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            placeholder="Transaction ID"
            style={{ width: '170px' }}
          ></input>
          <input
            type="text"
            name="clientId"
            id="clientId"
            value={formData.clientId}
            onChange={handleChange}
            placeholder="Client ID"
            style={{ width: '170px' }}
          ></input>
          <input
            type="text"
            name="orderId"
            id="orderId"
            value={formData.orderId}
            onChange={handleChange}
            placeholder="Order ID"
            style={{ width: '170px' }}
          ></input>
          <select
            name="type"
            id="transactionType"
            value={formData.type}
            onChange={handleChange}
            style={{ marginRight: '50px', height: '30px' }}
          >
            <option value="" disabled hidden>
              Type
            </option>
            <option value="Invoice">Invoice</option>
            <option value="Receipt">Receipt</option>
          </select>
          <Button type="submit" variant="dark" size="sm" style={{ width: '90px' }}>
            Search
          </Button>

          <Button onClick={openModal} variant="outline-dark" size="sm" style={{ position: 'absolute', right: '120px' }}>
            Add Transaction
          </Button>
        </div>
      </form>

      {showAddTransactionDialog && <AddTransactionModal closeModal={closeModal} />}
      <DeleteTransactionModal {...deleteModalProps} />;

      <TableContainer component={Paper} className="finances-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {formData.type === 'Receipt' ? (
                <>
                  <TableCell style={{ fontWeight: 'bold' }}>Receipt ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Invoice ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Client</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Payment Date</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Amount Paid (CAD)</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Attachments</TableCell>
                </>
              ) : (
                <>
                  <TableCell style={{ fontWeight: 'bold' }}>Invoice ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Client</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Invoice Date</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Due Date</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Amount Due (CAD)</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Attachments</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          {responseData && (
            <TableBody>
              {responseData.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {formData.type === 'Receipt'  && row.receiptid ? (
                    <>
                      <TableCell align="center">{row.receiptid}</TableCell>
                      <TableCell align="right">{row.invoiceid}</TableCell>
                      <TableCell align="right">{row.fname + ' ' + row.lname}</TableCell>
                      <TableCell align="right">{new Date(row.paymentdate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{row.amountpaid}</TableCell>
                      <TableCell align="right">{row.orderid}</TableCell>
                      <TableCell align="right">{row.attachment ? JSON.stringify(row.attachment) : ''}</TableCell>
                      <TableCell align="right">
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.receiptid)}>Delete</Button>
                      </TableCell>
                    </> 
                  ) : null}
                  {formData.type === 'Invoice' && row.invoiceid ? (
                    <>
                      <TableCell align="center">{row.invoiceid}</TableCell>
                      <TableCell align="right">{row.fname + ' ' + row.lname}</TableCell>
                      <TableCell align="right">{new Date(row.invoicedate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{new Date(row.duedate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{row.amountdue}</TableCell>
                      <TableCell align="right">{row.orderid}</TableCell>
                      <TableCell align="right">{row.attachment ? JSON.stringify(row.attachment) : ''}</TableCell>
                      <TableCell align="right">
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.invoiceid)}>Delete</Button>
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default Finances;
