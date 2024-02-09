import React from 'react';

const ConfirmationDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmationDialog;
