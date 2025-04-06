import React, { useState } from 'react';
import { deleteUserComp } from '../../services/dataService';
import './CompCard.css';

const CompCard = ({ comp, isUserComp, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Check for required properties
  if (!comp || !comp.agents) {
    console.error('CompCard received invalid data:', comp);
    return <div className="comp-card error">Invalid composition data</div>;
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (isDeleting) return; // Prevent multiple clicks
    
    try {
      setIsDeleting(true);
      await deleteUserComp(comp.id);
      
      // Call parent callback if provided
      if (onDelete) {
        onDelete(comp.id);
      } else {
        // If no callback provided, reload the page
        window.location.reload();
      }
    } catch (err) {
      console.error('Error deleting composition:', err);
      setError('Failed to delete composition');
      setIsDeleting(false);
    }
  };

  return (
    <div className="comp-card">
      <div className="comp-header">
        <h3 className="comp-title">{comp.title}</h3>
        {isUserComp && (
          <button 
            className={`delete-comp-btn ${isDeleting ? 'deleting' : ''}`}
            onClick={handleDelete}
            aria-label="Delete composition"
            disabled={isDeleting}
          >
            {isDeleting ? '...' : '×'}
          </button>
        )}
      </div>
      
      <div className="comp-content">
        <div className="comp-map">
          {comp.map && comp.map.imagePath && (
            <img 
              src={require(`../../assets${comp.map.imagePath}`)} 
              alt={comp.map.name} 
              className="map-thumbnail"
            />
          )}
          <span className="map-name">{comp.map?.name || 'Map'}</span>
        </div>
        
        <p className="comp-description">{comp.description}</p>
        
        {error && <p className="error-text">{error}</p>}
        
        <div className="comp-agents">
          {comp.agents.map((agent, index) => (
            <div key={index} className="agent-icon">
              {agent.imagePath ? (
                <img 
                  src={require(`../../assets${agent.imagePath}`)} 
                  alt={agent.name} 
                  title={agent.name}
                />
              ) : (
                <div className="agent-placeholder">{agent.name?.charAt(0) || '?'}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompCard; 