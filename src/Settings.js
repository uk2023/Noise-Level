import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slider';
import { Link } from 'react-router-dom';

import AlertModal from './AlertModal'; // Make sure to import your AlertModal component

Modal.setAppElement('#root');

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threshold, setThreshold] = useState(50);
  const [showAlert, setShowAlert] = useState(false); // New state for showing the alert

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSliderChange = (value) => {
    setThreshold(value);
  };

  const handleExportData = () => {
    // Implement your data export logic here
    // For example, create a CSV content and trigger download
    // ...
  };

  // Function to handle noise level change and show alert
  const handleNoiseLevelChange = (newNoiseLevel) => {
    if (newNoiseLevel >= 25) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  return (
    <div className="Settings">
      <div className="Content">
        <button onClick={openModal}>
          <FontAwesomeIcon icon={faCog} className="icon" />
          Set Alert
        </button>
        <button onClick={handleExportData}>
          <FontAwesomeIcon icon={faFileCsv} className="icon" />
          Export All Data
        </button>

        <AlertModal
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          message="Alert: Noise level has exceeded 25 dB"
        />

        <AlertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          threshold={threshold}
          onThresholdChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default Settings;
