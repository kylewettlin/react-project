import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuildComps.css';

// Import map images
import havenMap from '../../assets/images/maps/Haven.png';
import ascendMap from '../../assets/images/maps/Ascent.png';
import bindMap from '../../assets/images/maps/Bind.png';
import iceboxMap from '../../assets/images/maps/Icebox.png';
import splitMap from '../../assets/images/maps/Split.png';
import breezeMap from '../../assets/images/maps/Breeze.png';
import fractureMap from '../../assets/images/maps/Fracture.png';

// Import agent images
import brimstoneImg from '../../assets/images/agents/Brimstone.png';
import phoenixImg from '../../assets/images/agents/Phoenix.png';
import jettImg from '../../assets/images/agents/Jett.png';
import chamberImg from '../../assets/images/agents/Chamber.png';
import killjoyImg from '../../assets/images/agents/Killjoy.png';
import sovaImg from '../../assets/images/agents/Sova.png';
import sageImg from '../../assets/images/agents/Sage.png';
import omenImg from '../../assets/images/agents/Omen.png';
import viperImg from '../../assets/images/agents/Viper.png';
import skyeImg from '../../assets/images/agents/Skye.png';
import razeImg from '../../assets/images/agents/Raze.png';
import reynaImg from '../../assets/images/agents/Reyna.png';
import cypherImg from '../../assets/images/agents/Cypher.png';
import kayoImg from '../../assets/images/agents/Kayo.png';
import yoruImg from '../../assets/images/agents/Yoru.png';
import fadeImg from '../../assets/images/agents/Fade.png';
import neonImg from '../../assets/images/agents/Neon.png';
import harborImg from '../../assets/images/agents/Harbor.png';
import gekkoImg from '../../assets/images/agents/Gekko.png';
import deadlockImg from '../../assets/images/agents/Deadlock.png';
import isoImg from '../../assets/images/agents/Iso.png';
import cloveImg from '../../assets/images/agents/Clove.png';
import breachImg from '../../assets/images/agents/Breach.png';
import astraImg from '../../assets/images/agents/Astra.png';

const BuildComps = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    map: '',
    description: '',
    agents: Array(5).fill(null)
  });
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(null);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [filter, setFilter] = useState('all');

  // Map data
  const maps = [
    { value: 'haven', name: 'Haven', image: havenMap },
    { value: 'ascent', name: 'Ascent', image: ascendMap },
    { value: 'bind', name: 'Bind', image: bindMap },
    { value: 'split', name: 'Split', image: splitMap },
    { value: 'icebox', name: 'Icebox', image: iceboxMap },
    { value: 'breeze', name: 'Breeze', image: breezeMap },
    { value: 'fracture', name: 'Fracture', image: fractureMap }
  ];

  // All agents data
  const allAgents = [
    { id: 1, name: 'Brimstone', role: 'Controller', image: brimstoneImg },
    { id: 2, name: 'Phoenix', role: 'Duelist', image: phoenixImg },
    { id: 3, name: 'Jett', role: 'Duelist', image: jettImg },
    { id: 4, name: 'Sage', role: 'Sentinel', image: sageImg },
    { id: 5, name: 'Killjoy', role: 'Sentinel', image: killjoyImg },
    { id: 6, name: 'Skye', role: 'Initiator', image: skyeImg },
    { id: 7, name: 'Sova', role: 'Initiator', image: sovaImg },
    { id: 8, name: 'Viper', role: 'Controller', image: viperImg },
    { id: 9, name: 'Omen', role: 'Controller', image: omenImg },
    { id: 10, name: 'Raze', role: 'Duelist', image: razeImg },
    { id: 11, name: 'Chamber', role: 'Sentinel', image: chamberImg },
    { id: 12, name: 'Reyna', role: 'Duelist', image: reynaImg },
    { id: 13, name: 'Cypher', role: 'Sentinel', image: cypherImg },
    { id: 14, name: 'KAY/O', role: 'Initiator', image: kayoImg },
    { id: 15, name: 'Yoru', role: 'Duelist', image: yoruImg },
    { id: 16, name: 'Fade', role: 'Initiator', image: fadeImg },
    { id: 17, name: 'Neon', role: 'Duelist', image: neonImg },
    { id: 18, name: 'Harbor', role: 'Controller', image: harborImg },
    { id: 19, name: 'Gekko', role: 'Initiator', image: gekkoImg },
    { id: 20, name: 'Deadlock', role: 'Sentinel', image: deadlockImg },
    { id: 21, name: 'Iso', role: 'Duelist', image: isoImg },
    { id: 22, name: 'Clove', role: 'Controller', image: cloveImg },
    { id: 23, name: 'Breach', role: 'Initiator', image: breachImg },
    { id: 24, name: 'Astra', role: 'Controller', image: astraImg }
  ];

  // Get filtered agents based on the current filter
  const filteredAgents = filter === 'all' 
    ? allAgents 
    : allAgents.filter(agent => agent.role.toLowerCase() === filter.toLowerCase());

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Open agent selector for a specific position
  const openAgentSelector = (index) => {
    setSelectedAgentIndex(index);
    setShowAgentSelector(true);
  };

  // Select an agent for the current position
  const selectAgent = (agent) => {
    const newAgents = [...formData.agents];
    newAgents[selectedAgentIndex] = agent;
    setFormData({
      ...formData,
      agents: newAgents
    });
    setShowAgentSelector(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the map image based on the selected map value
    const selectedMap = maps.find(map => map.value === formData.map);
    const mapImage = selectedMap ? selectedMap.image : null;
    
    // Create the composition object
    const newComp = {
      id: Date.now(), // Use timestamp as a unique ID
      title: formData.name,
      description: formData.description,
      map: mapImage,
      agents: formData.agents.filter(agent => agent !== null)
    };
    
    // Get existing comps from localStorage or initialize empty array
    const existingComps = JSON.parse(localStorage.getItem('myComps')) || [];
    
    // Add new comp to the array
    const updatedComps = [...existingComps, newComp];
    
    // Save to localStorage
    localStorage.setItem('myComps', JSON.stringify(updatedComps));
    
    // Navigate to my comps page
    navigate('/my-comps');
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      map: '',
      description: '',
      agents: Array(5).fill(null)
    });
  };

  return (
    <div className="build-comps-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Build Compositions</h1>
        <p className="subtitle">Create your own agent team compositions</p>
      </section>
      
      {/* Build Form */}
      <section className="build-form-section">
        <div className="comp-builder">
          <form className="comp-form-container" onSubmit={handleSubmit}>
            <h2>Composition Details</h2>
            <div className="comp-details">
              <div className="form-group">
                <label htmlFor="name">Comp Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your composition name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="map">Map:</label>
                <select 
                  id="map" 
                  name="map"
                  value={formData.map}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a map</option>
                  {maps.map(map => (
                    <option key={map.value} value={map.value}>
                      {map.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your team composition strategy"
                  required
                ></textarea>
              </div>
            </div>
            
            <h2>Select Agents</h2>
            <div className="agent-selector">
              <p>Select 5 agents for your composition</p>
              
              <div className="agent-selection-grid">
                {formData.agents.map((agent, index) => (
                  <div 
                    key={index} 
                    className={`agent-selection-item ${agent ? 'selected' : ''}`}
                    onClick={() => openAgentSelector(index)}
                  >
                    {agent ? (
                      <>
                        <div className="agent-portrait">
                          <img src={agent.image} alt={agent.name} />
                        </div>
                        <p>{agent.name}</p>
                      </>
                    ) : (
                      <>
                        <div className="agent-portrait placeholder">
                          <span>?</span>
                        </div>
                        <p>Select Agent</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Composition</button>
              <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      </section>

      {/* Agent Selection Modal */}
      {showAgentSelector && (
        <div className="agent-selection-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Select an Agent</h2>
              <button 
                type="button" 
                className="close-modal"
                onClick={() => setShowAgentSelector(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="filter-section">
              <div className="filter-container">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${filter === 'duelist' ? 'active' : ''}`} 
                  onClick={() => setFilter('duelist')}
                >
                  Duelist
                </button>
                <button 
                  className={`filter-btn ${filter === 'initiator' ? 'active' : ''}`} 
                  onClick={() => setFilter('initiator')}
                >
                  Initiator
                </button>
                <button 
                  className={`filter-btn ${filter === 'controller' ? 'active' : ''}`} 
                  onClick={() => setFilter('controller')}
                >
                  Controller
                </button>
                <button 
                  className={`filter-btn ${filter === 'sentinel' ? 'active' : ''}`} 
                  onClick={() => setFilter('sentinel')}
                >
                  Sentinel
                </button>
              </div>
            </div>
            
            <div className="agent-grid-modal">
              {filteredAgents.map(agent => (
                <div 
                  key={agent.id} 
                  className="agent-modal-item"
                  onClick={() => selectAgent(agent)}
                >
                  <img src={agent.image} alt={agent.name} />
                  <p>{agent.name}</p>
                  <span className="agent-role">{agent.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildComps; 