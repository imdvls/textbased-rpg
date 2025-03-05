import React, { useState, useEffect } from 'react';

function Scene({ scene, onSelectOption, onReset, encounterActive, encounterOutcome }) {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [typingEffect, setTypingEffect] = useState(true);
  
  useEffect(() => {
    // Reset animations when scene changes
    setIsTextVisible(false);
    setIsOptionsVisible(false);
    
    // Stagger the animations
    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 300);
    
    const optionsTimer = setTimeout(() => {
      setIsOptionsVisible(true);
    }, 1500); // Show options after text animation completes
    
    return () => {
      clearTimeout(textTimer);
      clearTimeout(optionsTimer);
    };
  }, [scene]);

  // Toggle typing effect
  const handleToggleTypingEffect = () => {
    setTypingEffect(!typingEffect);
  };

  // Debug function to log option clicks
  const handleOptionClick = (option) => {
    console.log("Option clicked:", option);
    if (option.encounterAction) {
      console.log("This is an encounter action:", option.encounterAction);
    }
    onSelectOption(option);
  };

  if (!scene) {
    return (
      <div className="scene">
        <div className="loading-text">
          <span className="loading-letter">T</span>
          <span className="loading-letter">h</span>
          <span className="loading-letter">e</span>
          <span className="loading-letter"> </span>
          <span className="loading-letter">d</span>
          <span className="loading-letter">a</span>
          <span className="loading-letter">r</span>
          <span className="loading-letter">k</span>
          <span className="loading-letter">n</span>
          <span className="loading-letter">e</span>
          <span className="loading-letter">s</span>
          <span className="loading-letter">s</span>
          <span className="loading-letter"> </span>
          <span className="loading-letter">s</span>
          <span className="loading-letter">t</span>
          <span className="loading-letter">i</span>
          <span className="loading-letter">r</span>
          <span className="loading-letter">s</span>
          <span className="loading-letter">.</span>
          <span className="loading-letter">.</span>
          <span className="loading-letter">.</span>
        </div>
      </div>
    );
  }

  // Improved text formatting that preserves existing paragraph breaks
  // and adds breaks at sentence endings, but preserves common abbreviations
  const formatText = (text) => {
    if (!text) return '';
    
    // First, preserve existing paragraph breaks
    const paragraphs = text.split('\n');
    
    // Process each paragraph to add sentence breaks
    return paragraphs.map(paragraph => {
      // This regex matches periods that end sentences but not those in common abbreviations
      // It looks for a period followed by a space and then a capital letter
      return paragraph.replace(/\.\s+(?=[A-Z])/g, '.\n\n');
    }).join('\n\n');
  };

  const formattedText = formatText(scene.text);

  // Add atmospheric elements based on scene content
  const hasBlood = scene.text?.toLowerCase().includes('blood') || false;
  const hasDarkness = scene.text?.toLowerCase().includes('dark') || false;
  const hasWhispers = scene.text?.toLowerCase().includes('whisper') || false;
  const hasCold = scene.text?.toLowerCase().includes('cold') || false;
  const hasFire = scene.text?.toLowerCase().includes('fire') || scene.text?.toLowerCase().includes('flame') || false;
  const hasWater = scene.text?.toLowerCase().includes('water') || scene.text?.toLowerCase().includes('rain') || false;

  return (
    <div className={`scene 
      ${hasBlood ? 'scene-blood' : ''} 
      ${hasDarkness ? 'scene-dark' : ''} 
      ${hasWhispers ? 'scene-whispers' : ''} 
      ${hasCold ? 'scene-cold' : ''} 
      ${hasFire ? 'scene-fire' : ''}
      ${hasWater ? 'scene-water' : ''}
      ${encounterActive ? 'encounter-active' : ''}
      ${typingEffect ? 'typing-effect' : 'no-typing-effect'}
    `}>
      <div className="scene-controls">
        <button 
          className="scene-control-button" 
          onClick={handleToggleTypingEffect}
          title={typingEffect ? "Disable typing effect" : "Enable typing effect"}
        >
          {typingEffect ? "⏩" : "⏯️"}
        </button>
      </div>
      
      <div className={`scene-text ${isTextVisible ? 'visible' : ''}`}>
        {formattedText.split('\n\n').map((paragraph, i) => (
          <p key={i} className={`paragraph ${isTextVisible ? 'visible' : ''}`} style={{ '--delay': `${i * 0.2}s` }}>
            {paragraph}
          </p>
        ))}
      </div>
      
      {encounterOutcome && (
        <div className={`encounter-outcome ${encounterOutcome.success ? 'success' : 'failure'}`}>
          <p>{encounterOutcome.text}</p>
          <div className="encounter-stats">
            <div className="encounter-stat">
              <span className="encounter-stat-label">Health Lost:</span>
              <span className="encounter-stat-value">{encounterOutcome.healthLoss}</span>
            </div>
            <div className="encounter-stat">
              <span className="encounter-stat-label">Sanity Lost:</span>
              <span className="encounter-stat-value">{encounterOutcome.sanityLoss}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="decorative-divider">
        <span className="divider-ornament">✧</span>
      </div>
      
      <div className={`options ${isOptionsVisible ? 'visible' : ''} ${encounterActive ? 'encounter-options' : ''}`}>
        {scene.options && scene.options.length > 0 ? (
          scene.options.map((option, index) => (
            <button 
              key={index} 
              className={`option-button ${option.encounterAction ? 'encounter-action' : ''}`}
              onClick={() => handleOptionClick(option)}
              style={{ '--index': index }}
              data-action={option.encounterAction || ''}
            >
              <span className="option-text">{option.text}</span>
            </button>
          ))
        ) : (
          <div className="no-options">The path ahead is shrouded in darkness...</div>
        )}
      </div>
      
      {scene.gameOver && (
        <div className="game-over">
          <h2>{scene.text?.includes("escaped") ? "Escaped the Nightmare" : "Consumed by Darkness"}</h2>
          <p>{scene.text?.includes("escaped") ? 
            "You've fled the horrors that lurked within those accursed walls, but part of you remains behind. In your dreams, you'll return to that place, night after night, until your dying day." : 
            "Your soul joins the countless others trapped within these walls. Your screams will echo through the corridors, a warning to those who follow. Some say, on quiet nights, your whispers can still be heard."}</p>
          <button onClick={onReset} className="reset-button">
            {scene.text?.includes("escaped") ? "Tempt Fate Again" : "Face Your Fears"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Scene; 