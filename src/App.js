import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  // Get the base URL for GitHub Pages
  const baseUrl = process.env.PUBLIC_URL || '';
  
  return (
    <div className="App">
      <header className="game-header">
        <div className="header-content">
          <div>
            <a href={baseUrl + '/'} className="game-logo">Whispers in the Dark</a>
            <div className="game-tagline">Where shadows speak and nightmares breathe</div>
          </div>
        </div>
      </header>
      
      <main>
        <Game />
      </main>
      
      <footer className="game-footer">
        <div className="footer-content">
          <div>© {new Date().getFullYear()} Gothic Horror Adventures</div>
          <div className="footer-links">
            {/* These links won't work without proper routing, so we'll make them no-op for now */}
            <span className="footer-link">About</span>
            <span className="footer-link">Credits</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
