import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentSelector from '../../components/AgentSelector/AgentSelector';
import { getAgents, getMaps, saveUserComp } from '../../services/dataService';
import './BuildComps.css';

// Import a single fallback image for safety
import fallbackImg from "../../assets/images/agents/Brimstone.png";

const BuildComps = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [compTitle, setCompTitle] = useState('');
  const [compDescription, setCompDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch agents and maps from our service
        const [agentsData, mapsData] = await Promise.all([
          getAgents(),
          getMaps()
        ]);
        
        setAgents(agentsData);
        setMaps(mapsData);
      } catch (err) {
        console.error('Error fetching build data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleMapSelect = (mapId) => {
    const map = maps.find(m => m.id === parseInt(mapId));
    setSelectedMap(map);
    
    // Clear validation error if it exists
    if (errors.map) {
      setErrors(prev => ({ ...prev, map: null }));
    }
  };

  const handleAgentSelect = (agent) => {
    // Check if agent is already selected
    if (selectedAgents.some(a => a.id === agent.id)) {
      setSelectedAgents(prev => prev.filter(a => a.id !== agent.id));
    } else if (selectedAgents.length < 5) {
      setSelectedAgents(prev => [...prev, agent]);
      
      // Clear validation error if it exists
      if (errors.agents && selectedAgents.length === 4) {
        setErrors(prev => ({ ...prev, agents: null }));
      }
    }
  };

  const handleTitleChange = (e) => {
    setCompTitle(e.target.value);
    
    // Clear validation error if it exists
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: null }));
    }
  };

  const handleDescriptionChange = (e) => {
    setCompDescription(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!compTitle.trim()) {
      newErrors.title = 'Please enter a composition title.';
    }
    
    if (!selectedMap) {
      newErrors.map = 'Please select a map.';
    }
    
    if (selectedAgents.length !== 5) {
      newErrors.agents = 'Please select exactly 5 agents.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the composition object
      const newComp = {
        id: Date.now(), // Use timestamp as temporary ID
        title: compTitle,
        description: compDescription || 'No description provided',
        map: selectedMap,
        agents: selectedAgents
      };
      
      // Save to localStorage using our service
      await saveUserComp(newComp);
      
      // Navigate to My Comps page after successful save
      navigate('/my-comps');
    } catch (err) {
      console.error('Error saving composition:', err);
      setErrors({ submit: 'Failed to save composition. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to safely load images
  const getImageSrc = (path) => {
    try {
      return path ? require(`../../assets${path}`) : fallbackImg;
    } catch (error) {
      console.error(`Error loading image: ${path}`, error);
      return fallbackImg;
    }
  };

  return (
    <div className="build-comps-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Build Your Composition</h1>
        <p className="subtitle">Create and save your own agent compositions</p>
      </section>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="comp-form">
          {/* Composition Details */}
          <section className="form-section">
            <h2 className="section-title">Composition Details</h2>
            
            <div className="form-group">
              <label htmlFor="comp-title">Composition Title*</label>
              <input
                type="text"
                id="comp-title"
                value={compTitle}
                onChange={handleTitleChange}
                placeholder="Enter a name for your composition"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="comp-description">Description (Optional)</label>
              <textarea
                id="comp-description"
                value={compDescription}
                onChange={handleDescriptionChange}
                placeholder="Describe your composition strategy..."
                rows="3"
              ></textarea>
            </div>
          </section>
          
          {/* Map Selection */}
          <section className="form-section">
            <h2 className="section-title">Select a Map*</h2>
            
            <div className="maps-container">
              <ul className="maps-grid">
                {maps.map(map => (
                  <li 
                    key={map.id} 
                    className={`map-item ${selectedMap?.id === map.id ? 'selected' : ''}`}
                    onClick={() => handleMapSelect(map.id)}
                  >
                    <div className="map-card">
                      <div className="map-image-container">
                        <img 
                          src={getImageSrc(map.imagePath)}
                          alt={map.name} 
                          className="map-image"
                        />
                      </div>
                      <span className="map-name">{map.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {errors.map && <span className="error-text">{errors.map}</span>}
          </section>
          
          {/* Agent Selection */}
          <section className="form-section">
            <h2 className="section-title">Select 5 Agents*</h2>
            <p className="hint-text">Select exactly 5 agents for your composition</p>
            
            <div className="agent-selection-area">
              <AgentSelector 
                agents={agents} 
                selectedAgents={selectedAgents}
                onSelectAgent={handleAgentSelect}
              />
            </div>
            
            {errors.agents && <span className="error-text">{errors.agents}</span>}
          </section>
          
          {/* Selected Agents Preview */}
          <section className="form-section">
            <h2 className="section-title">Selected Agents ({selectedAgents.length}/5)</h2>
            
            <div className="selected-agents-preview">
              {selectedAgents.length === 0 ? (
                <p className="empty-selection">No agents selected yet</p>
              ) : (
                <ul className="selected-agents-list">
                  {selectedAgents.map(agent => (
                    <li key={agent.id} className="selected-agent-item">
                      <div className="selected-agent-card">
                        <img 
                          src={getImageSrc(agent.imagePath)}
                          alt={agent.name} 
                          className="selected-agent-image"
                        />
                        <span className="selected-agent-name">{agent.name}</span>
                        <button 
                          type="button"
                          className="remove-agent-btn"
                          onClick={() => handleAgentSelect(agent)}
                          aria-label={`Remove ${agent.name}`}
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                  
                  {/* Placeholders for remaining agent slots */}
                  {Array.from({ length: 5 - selectedAgents.length }).map((_, index) => (
                    <li key={`empty-${index}`} className="selected-agent-item">
                      <div className="empty-agent-slot">
                        <div className="agent-placeholder"></div>
                        <span className="empty-slot-text">Select Agent</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          
          {/* Submit Section */}
          <section className="form-section submit-section">
            {errors.submit && <span className="error-text">{errors.submit}</span>}
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Composition'}
            </button>
          </section>
        </form>
      )}
    </div>
  );
};

export default BuildComps; 