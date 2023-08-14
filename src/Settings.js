import React, { useState } from 'react';
import Slider from 'react-slider';

function Settings({ threshold, setThreshold }) {
  return (
    <div className="SettingsContainer">
      <h1>Settings</h1>
      <div className="SliderContainer">
        <Slider
          axis="x"
          x={threshold}
          xmax={100}
          onChange={({ x }) => setThreshold(x)}
        />
        <p>{threshold} dB</p>
      </div>
    </div>
  );
}

export default Settings;
