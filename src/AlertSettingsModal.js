import React, { useState } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slider';

Modal.setAppElement('#root');

function AlertSettingsModal({ isOpen, onClose, threshold, setThreshold }) {
  const [newThreshold, setNewThreshold] = useState(threshold);

  const handleSliderChange = ({ x }) => {
    setNewThreshold(x);
  };

  const handleSave = () => {
    setThreshold(newThreshold);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Alert Settings Modal"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Set Alert Threshold</h2>
      <div className="SliderContainer">
        <Slider
          axis="x"
          x={newThreshold}
          xmax={100}
          onChange={handleSliderChange}
        />
        <p>{newThreshold} dB</p>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
}

export default AlertSettingsModal;
