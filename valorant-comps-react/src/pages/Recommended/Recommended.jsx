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

  useEffect(() => {
    const fetchRecommendedComps = async () => {
      setIsLoading(true);
      
      try {
        // Fetch recommended compositions using our service
        const recommendedComps = await getRecommendedComps();
        setComps(recommendedComps);
      } catch (err) {
        console.error('Error fetching recommended compositions:', err);
        setError('Failed to load recommended compositions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendedComps();
  }, []);

  return (
    <div className="recommended-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Recommended Compositions</h1>
        <p className="subtitle">Pro-approved agent compositions for each map</p>
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
            <button className="retry-btn" onClick={() => window.location.reload()}>
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