import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompCard from '../../components/CompCard/CompCard';
import { getExampleComps, getUserComps } from '../../services/dataService';
import './MyComps.css';

const MyComps = () => {
  const [userComps, setUserComps] = useState([]);
  const [exampleComps, setExampleComps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    
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
  };

  return (
    <div className="my-comps-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>My Compositions</h1>
        <p className="subtitle">View and manage your saved compositions</p>
      </section>

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