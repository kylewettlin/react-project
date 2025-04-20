import React, { useState } from 'react';
import { deleteUserComp } from '../../services/dataService';
import './CompCard.css';

const CompCard = ({ comp, isUserComp, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Check for required properties
  if (!comp || !comp.agents) {
    console.error('CompCard received invalid data:', comp);
    return <div className="comp-card error">Invalid composition data</div>;
  }

  // Get map data from either mapData or map property
  const mapData = comp.mapData || comp.map;

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

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(comp);
    }
  };

  return (
    <div className="comp-card">
      <div className="comp-header">
        <h3 className="comp-title">{comp.title || comp.name}</h3>
        {isUserComp && (
          <div className="comp-actions">
            <button 
              className="edit-comp-btn"
              onClick={handleEdit}
              aria-label="Edit composition"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className={`delete-comp-btn ${isDeleting ? 'deleting' : ''}`}
              onClick={handleDelete}
              aria-label="Delete composition"
              disabled={isDeleting}
            >
              {isDeleting ? '...' : '×'}
            </button>
          </div>
        )}
      </div>
      
      <div className="comp-content">
        <div className="comp-map">
          {mapData && mapData.imagePath && (
            <img 
              src={require(`../../assets${mapData.imagePath}`)} 
              alt={mapData.name} 
              className="map-thumbnail"
            />
          )}
          <span className="map-name">
            {mapData?.name || (typeof comp.map === 'string' ? comp.map : 'Map')}
          </span>
        </div>
        
        <p className="comp-description">{comp.description || comp.strategy}</p>
        
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

        {comp.difficulty && (
          <div className="comp-difficulty">
            <span className={`difficulty-badge ${comp.difficulty.toLowerCase()}`}>
              {comp.difficulty}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompCard; 