import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AgentSelector from '../../components/AgentSelector/AgentSelector';
import { getAgents, getMaps, addComposition } from '../../services/dataService';
import './BuildComps.css';

// Import a single fallback image for safety
import fallbackImg from "../../assets/images/agents/Brimstone.png";

const BuildComps = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);
  const [agents, setAgents] = useState([]);
  const [mapNames, setMapNames] = useState([]);
  const [selectedMap, setSelectedMap] = useState('');
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [compName, setCompName] = useState('');
  const [compStrategy, setCompStrategy] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        
        // Extract map names for selection
        const uniqueMapNames = [...new Set(mapsData.map(map => map.name))];
        setMapNames(uniqueMapNames);
      } catch (err) {
        console.error('Error fetching build data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleMapSelect = (mapName) => {
    setSelectedMap(mapName);
    
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

  const handleNameChange = (e) => {
    setCompName(e.target.value);
    
    // Clear validation error if it exists
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: null }));
    }
  };

  const handleStrategyChange = (e) => {
    setCompStrategy(e.target.value);
    
    // Clear validation error if it exists
    if (errors.strategy) {
      setErrors(prev => ({ ...prev, strategy: null }));
    }
  };

  // Client-side validation matching Joi server validation
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!compName.trim()) {
      newErrors.name = 'Composition name is required.';
    } else if (compName.length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    } else if (compName.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters.';
    }
    
    // Map validation
    if (!selectedMap) {
      newErrors.map = 'Map selection is required.';
    }
    
    // Agents validation
    if (selectedAgents.length === 0) {
      newErrors.agents = 'Please select at least one agent.';
    } else if (selectedAgents.length > 5) {
      newErrors.agents = 'You cannot select more than 5 agents.';
    }
    
    // Strategy validation
    if (!compStrategy.trim()) {
      newErrors.strategy = 'Strategy description is required.';
    } else if (compStrategy.length < 10) {
      newErrors.strategy = 'Strategy must be at least 10 characters.';
    } else if (compStrategy.length > 200) {
      newErrors.strategy = 'Strategy cannot exceed 200 characters.';
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
    setSuccess(false);
    
    try {
      // Create the composition object for the API
      const newComp = {
        name: compName,
        map: selectedMap,
        agents: selectedAgents.map(agent => ({
          name: agent.name,
          role: agent.role,
          main_image: agent.imagePath || null
        })),
        strategy: compStrategy,
        difficulty: "Medium" // Default difficulty value
      };
      
      // Save composition using API
      const result = await addComposition(newComp);
      
      // Show success message
      setSuccess(true);
      
      // Reset form after successful submission
      setCompName('');
      setSelectedMap('');
      setSelectedAgents([]);
      setCompStrategy('');
      
      // Scroll to top to show success message
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Error saving composition:', err);
      
      // Set specific validation errors if returned from server
      if (err.errors && Array.isArray(err.errors)) {
        const serverErrors = {};
        err.errors.forEach(error => {
          if (error.includes('name')) serverErrors.name = error;
          else if (error.includes('map')) serverErrors.map = error;
          else if (error.includes('agents')) serverErrors.agents = error;
          else if (error.includes('strategy')) serverErrors.strategy = error;
          else serverErrors.submit = error;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ submit: 'Failed to save composition. Please try again.' });
      }
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

      {/* Success Message */}
      {success && (
        <div className="success-message">
          <p>Your composition was successfully added!</p>
          <div className="success-actions">
            <button className="btn primary-btn" onClick={() => navigate('/recommended')}>
              View Recommended Comps
            </button>
            <button className="btn secondary-btn" onClick={() => setSuccess(false)}>
              Add Another
            </button>
          </div>
        </div>
      )}

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
              <label htmlFor="comp-name">Composition Name*</label>
              <input
                type="text"
                id="comp-name"
                value={compName}
                onChange={handleNameChange}
                placeholder="Enter a name for your composition"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="comp-strategy">Strategy Description*</label>
              <textarea
                id="comp-strategy"
                value={compStrategy}
                onChange={handleStrategyChange}
                placeholder="Describe your composition strategy..."
                rows="3"
                className={errors.strategy ? 'error' : ''}
              ></textarea>
              {errors.strategy && <span className="error-text">{errors.strategy}</span>}
            </div>
          </section>
          
          {/* Map Selection */}
          <section className="form-section">
            <h2 className="section-title">Select a Map*</h2>
            
            <div className="maps-container">
              <div className="maps-grid">
                {mapNames.map(mapName => (
                  <div 
                    key={mapName} 
                    className={`map-item ${selectedMap === mapName ? 'selected' : ''}`}
                    onClick={() => handleMapSelect(mapName)}
                  >
                    <div className="map-card">
                      <span className="map-name">{mapName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {errors.map && <span className="error-text">{errors.map}</span>}
          </section>
          
          {/* Agent Selection */}
          <section className="form-section">
            <h2 className="section-title">Select Agents*</h2>
            <p className="hint-text">Select up to 5 agents for your composition</p>
            
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
                <div className="selected-agents-list">
                  {selectedAgents.map(agent => (
                    <div key={agent.id} className="selected-agent-item">
                      <img 
                        src={getImageSrc(agent.imagePath)} 
                        alt={agent.name} 
                        className="agent-thumbnail"
                      />
                      <div className="agent-details">
                        <span className="agent-name">{agent.name}</span>
                        <span className="agent-role">{agent.role}</span>
                      </div>
                      <button 
                        type="button"
                        className="remove-agent-btn"
                        onClick={() => handleAgentSelect(agent)}
                        aria-label={`Remove ${agent.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Form Submission */}
          <section className="form-section form-actions">
            {errors.submit && <div className="error-message">{errors.submit}</div>}
            
            <button 
              type="submit" 
              className="btn primary-btn submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Composition'}
            </button>
            
            <button 
              type="button" 
              className="btn secondary-btn"
              onClick={() => navigate('/recommended')}
            >
              Cancel
            </button>
          </section>
        </form>
      )}
    </div>
  );
};

export default BuildComps; 