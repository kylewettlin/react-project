import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompCard from '../../components/CompCard/CompCard';
import EditCompForm from '../../components/EditCompForm/EditCompForm';
import { getExampleComps, getUserComps, editUserComp } from '../../services/dataService';
import './MyComps.css';

const MyComps = () => {
  const [userComps, setUserComps] = useState([]);
  const [exampleComps, setExampleComps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingComp, setEditingComp] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user compositions and example compositions using our service
      const [userCompsData, exampleCompsData] = await Promise.all([
        getUserComps(),
        getExampleComps()
      ]);
      
      setUserComps(userCompsData);
      setExampleComps(exampleCompsData);
    } catch (err) {
      console.error('Error fetching compositions:', err);
      setError('Failed to load compositions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Handle composition deletion with optimistic UI update
  const handleCompDelete = (compId) => {
    // Update the state immediately for better UX
    setUserComps(prevComps => prevComps.filter(comp => comp.id !== compId));
    setStatusMessage({
      type: 'success',
      text: 'Composition successfully deleted!'
    });

    // Clear success message after 3 seconds
    setTimeout(() => {
      setStatusMessage({ type: '', text: '' });
    }, 3000);
  };

  // Handle composition edit
  const handleCompEdit = (comp) => {
    setEditingComp(comp);
    setStatusMessage({ type: '', text: '' });
  };

  // Handle save edit
  const handleSaveEdit = async (updatedData) => {
    try {
      const updatedComp = await editUserComp(editingComp.id, updatedData);
      
      // Update the state with the new data
      setUserComps(prevComps => 
        prevComps.map(comp => 
          comp.id === editingComp.id ? updatedComp : comp
        )
      );
      
      // Clear editing state and show success message
      setEditingComp(null);
      setStatusMessage({
        type: 'success',
        text: 'Composition successfully updated!'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatusMessage({ type: '', text: '' });
      }, 3000);
    } catch (err) {
      console.error('Error updating composition:', err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to update composition. Please try again.'
      });
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingComp(null);
    setStatusMessage({ type: '', text: '' });
  };

  return (
    <div className="my-comps-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>My Compositions</h1>
        <p className="subtitle">View and manage your saved compositions</p>
      </section>

      {/* Status Message */}
      {statusMessage.text && (
        <div className={`status-message ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      {/* Edit Form Modal */}
      {editingComp && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditCompForm
              comp={editingComp}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading compositions...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-btn" onClick={() => fetchData()}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* User Comps Section */}
          <section className="comp-section">
            <div className="section-header">
              <h2 className="section-title">Your Saved Compositions</h2>
              <Link to="/build-comps" className="create-comp-btn">
                Create New Composition
              </Link>
            </div>
            
            {userComps.length === 0 ? (
              <div className="empty-comps-message">
                <p>You haven't created any compositions yet.</p>
                <Link to="/build-comps" className="create-link">
                  Create your first composition
                </Link>
              </div>
            ) : (
              <div className="comp-cards-grid">
                {userComps.map(comp => (
                  <CompCard 
                    key={comp.id} 
                    comp={comp} 
                    isUserComp={true} 
                    onDelete={handleCompDelete}
                    onEdit={handleCompEdit}
                  />
                ))}
              </div>
            )}
          </section>
          
          {/* Example Comps Section */}
          <section className="comp-section">
            <h2 className="section-title">Example Compositions</h2>
            
            <div className="comp-cards-grid">
              {exampleComps.map(comp => (
                <CompCard key={comp.id} comp={comp} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyComps; 