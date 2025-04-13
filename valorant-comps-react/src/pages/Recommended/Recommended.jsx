import React, { useState, useEffect } from 'react';
import CompCard from '../../components/CompCard/CompCard';
import { getRecommendedComps } from '../../services/dataService';
import './Recommended.css';

// Fallback images in case API doesn't provide image URLs
import havenMap from "../../assets/images/maps/Haven.png";
import bindMap from "../../assets/images/maps/Bind.png";
import fractureMap from "../../assets/images/maps/Fracture.png";
import brimstoneImg from "../../assets/images/agents/Brimstone.png";
import phoenixImg from "../../assets/images/agents/Phoenix.png";
import jettImg from "../../assets/images/agents/Jett.png";
import chamberImg from "../../assets/images/agents/Chamber.png";
import killjoyImg from "../../assets/images/agents/Killjoy.png";
import sovaImg from "../../assets/images/agents/Sova.png";
import sageImg from "../../assets/images/agents/Sage.png";
import omenImg from "../../assets/images/agents/Omen.png";
import viperImg from "../../assets/images/agents/Viper.png";
import skyeImg from "../../assets/images/agents/Skye.png";
import razeImg from "../../assets/images/agents/Raze.png";

// Map of agent name to fallback image
const agentImageMap = {
  "Brimstone": brimstoneImg,
  "Phoenix": phoenixImg,
  "Jett": jettImg,
  "Chamber": chamberImg,
  "Killjoy": killjoyImg,
  "Sova": sovaImg,
  "Sage": sageImg,
  "Omen": omenImg,
  "Viper": viperImg,
  "Skye": skyeImg,
  "Raze": razeImg
};

// Map of map name to fallback image
const mapImageMap = {
  "Haven": havenMap,
  "Bind": bindMap,
  "Fracture": fractureMap
};

const Recommended = () => {
  const [comps, setComps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiSource, setApiSource] = useState(null);

  useEffect(() => {
    const fetchRecommendedComps = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch recommended compositions using our service
        const recommendedComps = await getRecommendedComps();
        setComps(recommendedComps);
        
        // Determine if data came from API or local fallback
        // The local data always uses the same format as the API, so we need to check
        // a specific property or pattern unique to the API data
        console.log('Received comps for display:', recommendedComps);
        
        // Check if data has unique API properties
        const isApiData = recommendedComps.length > 0 && 
          // Check if first comp has expected API properties
          (recommendedComps[0].map && recommendedComps[0].agents && 
          recommendedComps[0].strategy && recommendedComps[0].difficulty);
          
        setApiSource(isApiData ? 'Valorant API' : 'Local Fallback Data');
      } catch (err) {
        console.error('Error fetching recommended compositions:', err);
        setError('Failed to load recommended compositions. Please try again later.');
        setApiSource('Error');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendedComps();
  }, []);

  const handleRetry = () => {
    setComps([]);
    setIsLoading(true);
    setError(null);
    setApiSource(null);
    
    // Immediately attempt to fetch again
    getRecommendedComps()
      .then(data => {
        setComps(data);
        
        // Use same logic as above
        const isApiData = data.length > 0 && 
          (data[0].map && data[0].agents && 
          data[0].strategy && data[0].difficulty);
          
        setApiSource(isApiData ? 'Valorant API' : 'Local Fallback Data');
      })
      .catch(err => {
        console.error('Error retrying fetch:', err);
        setError('Failed to load recommended compositions. Please try again later.');
        setApiSource('Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="recommended-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Recommended Compositions</h1>
        <p className="subtitle">Pro-approved agent compositions for each map</p>
        {apiSource && !isLoading && !error && (
          <p className="data-source">Data source: {apiSource}</p>
        )}
      </section>

      {/* Cards Section */}
      <section className="comp-cards-section">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading recommended compositions...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-btn" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}
        
        {!isLoading && !error && comps.length === 0 && (
          <div className="no-data-message">
            <p>No recommended compositions available right now.</p>
          </div>
        )}
        
        {!isLoading && !error && comps.length > 0 && (
          <div className="comp-cards-grid">
            {comps.map(comp => (
              <CompCard key={comp.id} comp={comp} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Recommended; 