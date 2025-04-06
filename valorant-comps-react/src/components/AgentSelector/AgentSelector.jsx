import React, { useState } from 'react';
import './AgentSelector.css';

// Import fallback image
import fallbackAgentImg from "../../assets/images/agents/Brimstone.png";

const AgentSelector = ({ agents, selectedAgents, onSelectAgent }) => {
  const [filter, setFilter] = useState('all');

  // Filter agents based on selected role
  const filteredAgents = filter === 'all'
    ? agents
    : agents.filter(agent => agent.role.toLowerCase() === filter.toLowerCase());

  const isAgentSelected = (agent) => {
    return selectedAgents.some(a => a.id === agent.id);
  };

  const getAgentImage = (agent) => {
    try {
      return agent.imagePath ? require(`../../assets${agent.imagePath}`) : fallbackAgentImg;
    } catch (error) {
      console.error(`Error loading image for ${agent.name}:`, error);
      return fallbackAgentImg;
    }
  };

  return (
    <div className="agent-selector">
      {/* Filter Controls */}
      <div className="agent-filter-controls">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Agents
        </button>
        <button
          className={`filter-btn ${filter === 'duelist' ? 'active' : ''}`}
          onClick={() => setFilter('duelist')}
        >
          Duelists
        </button>
        <button
          className={`filter-btn ${filter === 'initiator' ? 'active' : ''}`}
          onClick={() => setFilter('initiator')}
        >
          Initiators
        </button>
        <button
          className={`filter-btn ${filter === 'controller' ? 'active' : ''}`}
          onClick={() => setFilter('controller')}
        >
          Controllers
        </button>
        <button
          className={`filter-btn ${filter === 'sentinel' ? 'active' : ''}`}
          onClick={() => setFilter('sentinel')}
        >
          Sentinels
        </button>
      </div>

      {/* Agent Grid */}
      <div className="agent-selection-grid">
        {filteredAgents.length === 0 ? (
          <p className="no-agents-message">No agents found for the selected filter.</p>
        ) : (
          filteredAgents.map(agent => (
            <div
              key={agent.id}
              className={`agent-select-card ${isAgentSelected(agent) ? 'selected' : ''}`}
              onClick={() => onSelectAgent(agent)}
            >
              <div className="agent-image-container">
                <img
                  src={getAgentImage(agent)}
                  alt={agent.name}
                  className="agent-image"
                />
                {isAgentSelected(agent) && (
                  <div className="selected-indicator">
                    <span>✓</span>
                  </div>
                )}
              </div>
              <div className="agent-info">
                <span className="agent-name">{agent.name}</span>
                <span className="agent-role">{agent.role}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentSelector; 