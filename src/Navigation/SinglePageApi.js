import React, { useState } from 'react';
import './SinglePageApi.css';
import { NavLink } from 'react-router-dom';
import USRgenerate from '../USRgenerationFolder/USRgenerate';
import viewTable from "../USRgenerationFolder/USR"
const App = () => {
  const [progress, setProgress] = useState(0);
  const [accordions, setAccordions] = useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
    accordion4: false,
  });
  const [accordion1Option, setAccordion1Option] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleButtonClick = (buttonIndex) => {
    // Check if the previous accordion is opened
    const previousAccordion = `accordion${buttonIndex - 1}`;
    if (buttonIndex > 1 && !accordions[previousAccordion]) {
      return; // Exit early if the previous step is not completed
    }

    // Check if the button is already clicked
    const accordionKey = `accordion${buttonIndex}`;
    if (accordions[accordionKey] || (buttonIndex === 2 && accordion1Option === '')) {
      return; // Exit early if the button is already clicked or Accordion 1 option is not chosen
    }

    // Update the progress based on the current accordion index
    const newProgress = (buttonIndex / Object.keys(accordions).length) * 100;
    setProgress(newProgress);

    // Open the clicked accordion and close the previous accordion
    setAccordions((prevAccordions) => ({
      ...prevAccordions,
      [accordionKey]: true,
      [previousAccordion]: false,
    }));
  };

  const handleReset = () => {
    setProgress(0);
    setAccordions({
      accordion1: false,
      accordion2: false,
      accordion3: false,
      accordion4: false,
    });
    setAccordion1Option('');
    setGeneratedContent('');
  };

  const handleAccordion1OptionChange = (event) => {
    setAccordion1Option(event.target.value);
    setGeneratedContent('');
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={() => handleButtonClick(1)} className="button">
          Enter Text
        </button>
        <button onClick={() => handleButtonClick(2)} className="button">
          Generate USR
        </button>
        <button onClick={() => handleButtonClick(3)} className="button">
          Edit USR
        </button>
        <button onClick={() => handleButtonClick(4)} className="button">
          Generate text
        </button>
        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="accordions">
        <h2>Language Communicator</h2>
        <div className="accordion">
          <button onClick={() => handleButtonClick(1)}>Select Type of Text to be inserted</button>
          {accordions.accordion1 && (
            <div>
              <USRgenerate />
            </div>
          )}
        </div>
        <div className="accordion">
        <button sx={{ margin: '5px' }} variant="contained" onClick={viewTable} >Edit</button>
          {accordions.accordion2 && (
            <div>
              
            </div>
          )}
        </div>
        <div className="accordion">
          <button onClick={() => handleButtonClick(3)}>Results</button>
          {accordions.accordion3 && <div>Content for Accordion 3</div>}
        </div>
        
      </div>
    </div>
  );
};

export default App;