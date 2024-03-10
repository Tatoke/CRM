import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './Roles.css';
import AddEmployeeModal from '../../components/AddEmployee_modal/AddEmployeemodal';
import DeleteEmployeeModal from '../../components/DeleteEmployee_modal/DeleteEmployeeModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Roles(props) {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [deleteModalProps, setDeleteModalProps] = useState({ show: false });
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeFirstName: '',
    employeeLastName: '',
  });

  function openModal(){
    setShowAddEmployeeModal(true);  //open modal on 'Add Employee' btn clicked
    }

  function closeModal(){
    setShowAddEmployeeModal(false);  //close modal  'Add Employee' 
    fetchData();
    }

  const fetchData = async () => {
    try{
        const response = await fetch(`http://localhost:3000/employee/?employeeId=${formData.employeeId}&employeeFirstName=${formData.employeeFirstName}&employeeLastName=${formData.employeeLastName}`);
        const data = await response.json();
        
        console.log(data);
        setResponseData(data); 
    }
    catch(err){
        console.error('Error fetching data:', err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      // Open the DeleteTransactionModal with the appropriate props
      setDeleteModalProps({
        show: true,
        employeeId: id,
        onDelete: async () => {
          const response = await fetch(`http://localhost:3000/employees/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete employeeId ${id}: ${errorMessage}`);
          }
  
          console.log(`employeeId ${id} deleted successfully`);
          // After deletion, fetch data again
          fetchData();
        },
        closeModal: () => {
          setDeleteModalProps({ ...deleteModalProps, show: false });
        },
      });
    } catch (err) {
      console.error(`Error deleting employeeId ${id}:`, err.message);
    }
  };

  return (
    <div className="page-layout">
      <h4>Employees</h4>

      <form className="employee-form" onSubmit={handleSubmit} >
        <div className="left">
          <input
            type="text"
            name="employeeId"
            id="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            style={{ width: '170px' }}
          ></input>
          <input
            type="text"
            name="employeeFirstName"
            id="employeeFirstName"
            value={formData.employeeFirstName}
            onChange={handleChange}
            placeholder="First Name"
            style={{ width: '170px' }}
          ></input>
          <input
            type="text"
            name="employeeLastName"
            id="employeeLastName"
            value={formData.employeeLastName}
            onChange={handleChange}
            placeholder="Last Name"
            style={{ width: '170px' }}
          ></input>
         
          <Button type="submit" variant="dark" size="sm" style={{ width: '90px', position: 'absolute', right: '95px', top: '265px'}}>
            Search
          </Button>

          <Button  onClick={openModal} variant="outline-dark" size="sm" style={{ position: 'absolute', right: '120px', top: '180px'}}>
            Add Employee
          </Button>
        </div>
      </form>

        {/* MODAL: shows conditionally */}
        {showAddEmployeeModal && <AddEmployeeModal closeModal={closeModal} fetchData={fetchData} />}
        <DeleteEmployeeModal {...deleteModalProps} />

      <TableContainer component={Paper} className="employee-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>Employee ID</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Phone</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>City</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Province</TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>Role</TableCell>
            </TableRow>
          </TableHead>

          {responseData && (
            <TableBody>
              {responseData.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {row.employeeid ? (
                    <>
                      <TableCell align="center">{row.employeeid}</TableCell>
                      <TableCell align="right">{row.fname + ' ' + row.lname}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.province}</TableCell>
                      <TableCell align="right"> </TableCell>
                      <TableCell align="right">
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row.employeeid)}>Delete</Button>
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

export default Roles;
