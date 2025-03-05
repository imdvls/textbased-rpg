import React, { useState, useEffect } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  // Get the base URL for GitHub Pages
  const baseUrl = process.env.PUBLIC_URL || '';
  const [isLoading, setIsLoading] = useState(true);
  
  // Add a loading effect for a more polished experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`App ${isLoading ? 'loading' : 'loaded'}`}>
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-content">
            <h1 className="loading-title">Whispers in the Dark</h1>
            <div className="loading-spinner"></div>
            <p className="loading-message">The mansion awaits your arrival...</p>
          </div>
        </div>
      ) : (
        <>
          <header className="game-header">
            <div className="header-content">
              <div>
                <a href={baseUrl + '/'} className="game-logo">Whispers in the Dark</a>
                <div className="game-tagline">Where shadows speak and nightmares breathe</div>
              </div>
              <nav className="header-nav">
                <a href="https://github.com/imdvls/textbased-rpg" target="_blank" rel="noopener noreferrer" className="nav-link">
                  <span className="nav-icon">📖</span>
                  <span className="nav-text">GitHub</span>
                </a>
              </nav>
            </div>
          </header>
          
          <main>
            <Game />
          </main>
          
          <footer className="game-footer">
            <div className="footer-content">
              <div className="footer-info">
                <div className="copyright">© {new Date().getFullYear()} Gothic Horror Adventures</div>
                <div className="footer-tagline">A text-based journey into darkness</div>
              </div>
              <div className="footer-links">
                <span className="footer-link" title="About the game">About</span>
                <span className="footer-link" title="Game credits">Credits</span>
                <a 
                  href="https://github.com/imdvls/textbased-rpg/issues" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link"
                >
                  Feedback
                </a>
              </div>
            </div>
            <div className="footer-disclaimer">
              <p>Best experienced in a dark room with headphones.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
