import React, { useState, useEffect } from 'react';
import './EditCompForm.css';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];
const AGENT_ROLES = ['Duelist', 'Controller', 'Initiator', 'Sentinel'];

const EditCompForm = ({ comp, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    map: '',
    agents: [],
    strategy: '',
    difficulty: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (comp) {
      setFormData({
        name: comp.name || comp.title || '',
        map: comp.map?.name || comp.map || '',
        agents: comp.agents || [],
        strategy: comp.strategy || comp.description || '',
        difficulty: comp.difficulty || 'Medium' // Default to Medium if not set
      });
    }
  }, [comp]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Map validation
    if (!formData.map) {
      newErrors.map = 'Map is required';
    }

    // Agents validation
    if (!formData.agents || formData.agents.length === 0) {
      newErrors.agents = 'At least 1 agent is required';
    } else if (formData.agents.length > 5) {
      newErrors.agents = 'Maximum 5 agents allowed';
    } else {
      const agentErrors = formData.agents.some(agent => {
        return !agent.name || !agent.role || !AGENT_ROLES.includes(agent.role);
      });
      if (agentErrors) {
        newErrors.agents = 'All agents must have a name and valid role';
      }
    }

    // Strategy validation
    if (!formData.strategy) {
      newErrors.strategy = 'Strategy is required';
    } else if (formData.strategy.length < 10) {
      newErrors.strategy = 'Strategy must be at least 10 characters';
    } else if (formData.strategy.length > 200) {
      newErrors.strategy = 'Strategy must be less than 200 characters';
    }

    // Difficulty validation
    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty is required';
    } else if (!DIFFICULTY_OPTIONS.includes(formData.difficulty)) {
      newErrors.difficulty = 'Invalid difficulty level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSave(formData);
      } catch (error) {
        setErrors({ submit: 'Failed to save changes. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAgentChange = (index, field, value) => {
    const updatedAgents = [...formData.agents];
    updatedAgents[index] = { ...updatedAgents[index], [field]: value };
    setFormData({ ...formData, agents: updatedAgents });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-comp-form">
      <h2>Edit Composition</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="map">Map *</label>
        <input
          type="text"
          id="map"
          value={formData.map}
          onChange={(e) => setFormData({ ...formData, map: e.target.value })}
          className={errors.map ? 'error' : ''}
        />
        {errors.map && <span className="error-text">{errors.map}</span>}
      </div>

      <div className="form-group">
        <label>Agents *</label>
        {formData.agents.map((agent, index) => (
          <div key={index} className="agent-input-group">
            <input
              type="text"
              value={agent.name}
              onChange={(e) => handleAgentChange(index, 'name', e.target.value)}
              placeholder="Agent name"
            />
            <select
              value={agent.role}
              onChange={(e) => handleAgentChange(index, 'role', e.target.value)}
            >
              <option value="">Select Role</option>
              {AGENT_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        ))}
        {errors.agents && <span className="error-text">{errors.agents}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="strategy">Strategy *</label>
        <textarea
          id="strategy"
          value={formData.strategy}
          onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
          className={errors.strategy ? 'error' : ''}
          rows="4"
        />
        {errors.strategy && <span className="error-text">{errors.strategy}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Difficulty *</label>
        <select
          id="difficulty"
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          className={errors.difficulty ? 'error' : ''}
        >
          <option value="">Select Difficulty</option>
          {DIFFICULTY_OPTIONS.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        {errors.difficulty && <span className="error-text">{errors.difficulty}</span>}
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}

      <div className="form-actions">
        <button 
          type="submit" 
          className="save-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          type="button" 
          className="cancel-btn" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCompForm; 