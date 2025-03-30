import React, { useState } from 'react';
import './AgentCard.css';

const AgentCard = ({ agent }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div 
      className={`agent-card ${isActive ? 'active' : ''}`} 
      onClick={toggleActive}
    >
      <img src={agent.image} alt={agent.name} />
      <h3>{agent.name}</h3>
      <p className="agent-role">{agent.role}</p>
      <div className="agent-description">
        <p>{agent.description}</p>
        <div className="abilities">
          <h4>Abilities:</h4>
          <ul>
            {agent.abilities && agent.abilities.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}: </strong>
                {ability.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentCard; 