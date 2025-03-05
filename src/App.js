import React from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <header className="game-header">
        <div className="header-content">
          <div>
            <a href="/" className="game-logo">Whispers in the Dark</a>
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
            <a href="/about" className="footer-link">About</a>
            <a href="/credits" className="footer-link">Credits</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
