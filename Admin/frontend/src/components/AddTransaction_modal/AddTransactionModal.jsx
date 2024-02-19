import React, { useState } from 'react';
import './AddTransactionModal.css';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from 'react-icons/io5';

// MODAL
const AddTransaction = ({ closeModal, onAddTransaction }) => {
  const [orderID, setOrderID] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state based on input name
    switch (name) {
      case 'orderID':
        setOrderID(value);
        break;
      case 'transactionType':
        setTransactionType(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'dueDate':
        setDueDate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new transaction to the callback
    onAddTransaction({ orderID, transactionType, amount, dueDate });
    // Close the dialog
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='add-transaction-modal'>
        {/* CLOSE BUTTON */}
        <IoCloseOutline size='2em'  onClick={()=>closeModal()} className='close-btn' />
        <h5 className='center-element' style={{ marginBottom: '2.5em' }}>
          New Transaction
        </h5>

        <div className='section'>
          <div className='subsection'>
            <label htmlFor='orderID' required>
              Order ID
            </label>
            <input
              id='orderID'
              name='orderID'
              type='text'
              placeholder='Order ID'
              onChange={handleChange}
            ></input>
          </div>

          <div className='subsection'>
          <label htmlFor='transactionType'>Type</label>
            <select
              name='transactionType'
              id='transactionType'
              value={transactionType}
              onChange={handleChange}
              style={{ marginRight: '50px', height: '30px' }}
            >
              <option value='' disabled hidden>
                Type
              </option>
              <option value='Receipt'>Receipt</option>
              <option value='Invoice'>Invoice</option>
            </select>
          </div>

          <div className='subsection'>
            <label htmlFor='amount'>Amount</label>
            <input
              id='amount'
              name='amount'
              type='text'
              placeholder='Amount'
              onChange={handleChange}
            ></input>
          </div>

          <div className='subsection'>
            <label htmlFor='dueDate'>Due Date</label>
            <input
              id='dueDate'
              name='dueDate'
              type='date'
              placeholder='Due Date'
              onChange={handleChange}
            ></input>
          </div>

          <div className='subsection'>
           <label htmlFor='attachments'>Attachments</label>
           <input
            id='attachments'
            name='attachments'
            type='file'
            onChange={handleChange}
            style={{ width: '95%' }} 
          ></input>
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
      <div className='overlay' ></div>
    </div>
  );
};

export default AddTransaction;
