import React, { useState } from 'react';
import './AddTransactionModal.css';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from 'react-icons/io5';

function AddTransaction({ closeModal }) {
  const [formData, setFormData] = useState({
    orderID: '',
    invoiceID: '',
    transactionType: '',
    amount: '',
    dueDate: '',
    paymentDate: '',
    invoiceDate: '',
    attachments: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
  
    const endpoint = formData.transactionType === 'Invoice' ? 'invoices' : 'receipts';
  
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add ${endpoint}`);
      }
  
      // Handle successful response, e.g., show a success message
      console.log(`${endpoint} added successfully`);
      closeModal();
    } catch (err) {
      console.error(`Error adding ${endpoint}:`, err.message);
    }
  
    // empty input fields at the end
    setFormData({
      orderID: '',
      invoiceID: '',
      transactionType: '',
      amount: '',
      dueDate: '',
      paymentDate: '',
      invoiceDate: '',
      attachments: '',
    });
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Add this line to update transactionType
    if (name === 'transactionType') {
      setFormData({ ...formData, transactionType: value });
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData({ ...formData, attachments: file });
 }


  return (
    <div>
      <form onSubmit={handleSubmit} className='add-transaction-modal'>
        {/* CLOSE BUTTON */}
        <IoCloseOutline size='2em' onClick={() => closeModal()} className='close-btn' />
        <h5 className='center-element' style={{ marginBottom: '2.5em' }}>
          New Transaction
        </h5>

        <div className='label-input-group'>
          <label htmlFor='transactionType'>Type</label>
          <select
            name='transactionType'
            id='transactionType'
            onChange={handleChange}
            value={formData.transactionType}
            required
          >
            <option value='' disabled hidden>
              Type
            </option>
            <option value='Invoice'>Invoice</option>
            <option value='Receipt'>Receipt</option>
          </select>
        </div>

        {formData.transactionType === 'Invoice' && (
          <div>
            <div className='label-input-group'>
              <label htmlFor='orderID'>Order ID</label>
              <input
                id='orderID'
                name='orderID'
                type='text'
                placeholder='Order ID'
                value={formData.orderID}
                onChange={handleChange}
                required
              />
            </div>

            <div className='label-input-group'>
              <label htmlFor='invoiceDate'>Invoice Date</label>
              <input
                id='invoiceDate'
                name='invoiceDate'
                type='date'
                placeholder='Invoice Date'
                value={formData.invoiceDate}
                required
                onChange={handleChange}
              />
            </div>

            <div className='label-input-group'>
              <label htmlFor='dueDate'>Due Date</label>
              <input
                id='dueDate'
                name='dueDate'
                type='date'
                placeholder='Due Date'
                value={formData.dueDate}
                required
                onChange={handleChange}
              />
            </div>

            <div className='label-input-group'>
              <label htmlFor='amount'>Amount</label>
              <input
                id='amount'
                name='amount'
                type='text'
                placeholder='Amount'
                value={formData.amount}
                required
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {formData.transactionType === 'Receipt' && (
          <div>
            <div className='label-input-group'>
              <label htmlFor='invoiceID'>Invoice ID</label>
              <input
                id='invoiceID'
                name='invoiceID'
                type='text'
                placeholder='Invoice ID'
                value={formData.invoiceID}
                onChange={handleChange}
                required
              />
            </div>

            <div className='label-input-group'>
              <label htmlFor='paymentDate'>Payment Date</label>
              <input
                id='paymentDate'
                name='paymentDate'
                type='date'
                placeholder='Payment Date'
                value={formData.paymentDate}
                required
                onChange={handleChange}
              />
            </div>

            <div className='label-input-group'>
              <label htmlFor='amount'>Amount</label>
              <input
                id='amount'
                name='amount'
                type='text'
                placeholder='Amount'
                value={formData.amount}
                required
                onChange={handleChange}
              />
            </div>
          </div>
        )}

          <div className='label-input-group'>
            <label>Attachments</label>
            {/* Custom file upload area */}
            <div className='upload-area' onClick={() => document.getElementById('myFile').click()}>
              <input
                type='file'
                onChange={handleFileChange}
                id='myFile'
                name='myFile'
                className='upload-input' 
                style={{ borderStyle: 'none' }}
              />
            </div>
          </div>

        {/* ADD BUTTON */}
        <div className='center-element'>
          <Button type='submit' variant='dark' size='sm'>
            Add
          </Button>
        </div>
      </form>

      {/* Semi-transparent overlay */}
      <div className='overlay'></div>
    </div>
  );
}

export default AddTransaction;
