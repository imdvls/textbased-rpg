import React from 'react';

function PlayerStats({ stats }) {
  return (
    <div className="player-info">
      <h3 className="player-name">Survivor</h3>
      
      <div className="player-stats">
        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Health</span>
            <span className="stat-value">{stats.health}%</span>
          </div>
          <div className="health-bar">
            <div 
              className="health-fill" 
              style={{ width: `${stats.health}%` }}
            ></div>
          </div>
          <div className="stat-numeric">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Sanity</span>
            <span className="stat-value">{stats.sanity}%</span>
          </div>
          <div className="sanity-bar">
            <div 
              className="sanity-fill" 
              style={{ width: `${stats.sanity}%` }}
            ></div>
          </div>
          <div className="stat-numeric">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Steps Taken</span>
            <span className="stat-value">{stats.steps}</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-header">
            <span className="stat-label">Encounters</span>
            <span className="stat-value">{stats.encounters}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats; 