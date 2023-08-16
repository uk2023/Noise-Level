import React from 'react';
import Modal from 'react-modal';
import Slider from 'react-slider';

Modal.setAppElement('#root');

function AlertModal({ isOpen, onClose, threshold, onThresholdChange, onSaveThreshold }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Ensure the value is a number and within valid range (0-100)
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onThresholdChange(Number(value));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Set Alert Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Set Alert Threshold</h2>
      <div className="InputContainer">
        <p>Adjust the noise threshold level:</p>
        <label htmlFor="thresholdInput">Threshold Frequency (0-100 dB):</label>
        <input
          type="number"
          id="thresholdInput"
          value={threshold}
          onChange={handleInputChange}
          min={0}
          max={100}
        />
      </div>
      <div className="ButtonContainer">
        <button onClick={onSaveThreshold}>Set Threshold</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}

export default AlertModal;
