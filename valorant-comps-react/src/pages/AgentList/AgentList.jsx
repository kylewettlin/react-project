import React, { useState, useEffect } from 'react';
import AgentCard from "../../components/AgentCard/AgentCard.jsx";
import { getAgents } from '../../services/dataService';
import './AgentList.css';

// Import fallback agents image
import fallbackAgentImg from "../../assets/images/agents/Brimstone.png";

const AgentList = () => {
  const [filter, setFilter] = useState('all');
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true);
      
      try {
        // Fetch agents from our service (which loads from JSON)
        const agentsData = await getAgents();
        
        // Process the data to ensure we have all necessary fields
        const processedData = agentsData.map(agent => ({
          ...agent,
          // The AgentCard component expects an 'image' property
          image: agent.imagePath ? require(`../../assets${agent.imagePath}`) : fallbackAgentImg
        }));
        
        setAgents(processedData);
      } catch (err) {
        console.error('Error fetching agents:', err);
        setError('Failed to load agent data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  
  // Filter agents based on selected role
  const filteredAgents = filter === 'all' 
    ? agents 
    : agents.filter(agent => agent.role.toLowerCase() === filter.toLowerCase());

  return (
    <div className="agent-list-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Agent Library</h1>
        <p className="subtitle">Learn about all available agents and their abilities</p>
      </section>

      {/* Filter Controls */}
      <section className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Agents
        </button>
        <button 
          className={`filter-btn ${filter === 'duelist' ? 'active' : ''}`}
          onClick={() => handleFilterChange('duelist')}
        >
          Duelists
        </button>
        <button 
          className={`filter-btn ${filter === 'initiator' ? 'active' : ''}`}
          onClick={() => handleFilterChange('initiator')}
        >
          Initiators
        </button>
        <button 
          className={`filter-btn ${filter === 'controller' ? 'active' : ''}`}
          onClick={() => handleFilterChange('controller')}
        >
          Controllers
        </button>
        <button 
          className={`filter-btn ${filter === 'sentinel' ? 'active' : ''}`}
          onClick={() => handleFilterChange('sentinel')}
        >
          Sentinels
        </button>
      </section>

      {/* Agent Grid */}
      <section className="agent-grid-section">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading agents...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}
        
        {!isLoading && !error && filteredAgents.length === 0 && (
          <div className="no-data-message">
            <p>No agents found for the selected filter.</p>
          </div>
        )}
        
        {!isLoading && !error && filteredAgents.length > 0 && (
          <div className="agent-grid">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AgentList; 