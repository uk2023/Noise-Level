import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarListen, faHouse, faEnvelope, faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Settings from './Settings';
import ContactUs from './ContactUs'; // Make sure you have a ContactUs component
import Login from './Login'

Modal.setAppElement('#root');

function App() {
  const [thresholdExceeded, setThresholdExceeded] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [threshold, setThreshold] = useState(50);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [noiseData, setNoiseData] = useState([]);

  const timerRef = useRef(null);
  const recordingRef = useRef(false);
  const startTimeRef = useRef(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);


  const startRecording = async () => {
    try {
      await initMicrophone();
      recordingRef.current = true;
      startTimeRef.current = Date.now();
      setIsMeasuring(true);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    recordingRef.current = false;
    setIsMeasuring(false);
    clearInterval(timerRef.current);
    closeMicrophone();
    setElapsedTime(0); // Reset the timer
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      if (recordingRef.current) {
        const currentTime = Date.now();
        const elapsedTimeInSeconds = Math.floor((currentTime - startTimeRef.current) / 1000);
        setElapsedTime(elapsedTimeInSeconds);
        updateNoiseLevel();
        recordNoiseData(elapsedTimeInSeconds, noiseLevel); // Record noise data
      }
    }, 1000);
  };

  const initMicrophone = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      await navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const source = audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          source.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        });
    } catch (error) {
      console.error('Error initializing microphone:', error);
    }
  };

  const closeMicrophone = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(error => console.error('Error closing audio context:', error));
      audioContextRef.current = null;
    }
  };

  const updateNoiseLevel = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
      setNoiseLevel(average);
      setThresholdExceeded(average > threshold);
    }
  };

  const recordNoiseData = (time, noiseLevel) => {
    setNoiseData(prevData => [...prevData, { time, noiseLevel }]);
  };

  useEffect(() => {
    if (isMeasuring) {
      const updateInterval = setInterval(startTimer, 1000); // Update timer every second
      return () => clearInterval(updateInterval);
    }
  }, [isMeasuring, threshold, startTimer]);

  // Function to format time in hh:mm:ss format
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
  }

  // Function to pad a number with leading zeros
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }

  return (
    <Router>
    <div className="App">
      <nav className="Navbar">
        <div className="ear-icon">
          <FontAwesomeIcon icon={faEarListen} />
          <p>Noise Level</p>
        </div>
        <ul>
          <li>
          <a href="/">
            <FontAwesomeIcon icon={faHouse} className="home-icon" />
            Home
          </a>
          </li>
          <li>
            <Link to="/contact">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} className="set-icon" />
              Settings
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} className="login-icon" />
              Login
              </Link>
          </li>
        </ul>
      </nav>


        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="contact" element={<ContactUs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>


        <header className="App-header">
          <div className="HeaderColumn">
            <div className="DisplayBox">
              {/* Display noise level */}
              <p className={`NoiseLevel ${thresholdExceeded ? 'ThresholdExceeded' : ''}`}>
                {noiseLevel.toFixed(2)} dB
              </p>
              {/* Display timer */}
              <p className="Timer">{formatTime(elapsedTime)}</p>
            </div>
          </div>

          <div className="ButtonContainer">
            <button onClick={() => (isMeasuring ? stopRecording() : startRecording())}>
              {isMeasuring ? 'Stop Measuring' : 'Start Measuring'}
            </button>
          </div>
          </header>

        <section className="ChartScrollContainer">
          {/* ... Chart content ... */}
        </section>

        
      </div>
    </Router>
  );
}

export default App;
