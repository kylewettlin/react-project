import React from 'react';
import './CompItem.css';

const CompItem = ({ title, description, agents, map }) => {
  return (
    <div className="comp-item">
      <div className="map-background">
        <img src={map} alt={`${title} map background`} />
      </div>
      <div className="comp-content">
        <div className="comp-title">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="comp-agents">
          {agents.map((agent, index) => (
            <a key={index} href="#!" className="agent-icon">
              <img 
                src={agent.img || agent.image} 
                alt={agent.name} 
                title={agent.name}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompItem; 