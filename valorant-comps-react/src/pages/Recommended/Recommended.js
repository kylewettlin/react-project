import React from 'react';
import CompItem from '../../components/CompItem/CompItem';
import './Recommended.css';

// Import sample images for the example
import havenMap from '../../assets/images/maps/Haven.png';
import bindMap from '../../assets/images/maps/Bind.png';
import fractureMap from '../../assets/images/maps/Fracture.png';
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

const Recommended = () => {
  // Sample comp data (would be loaded from JSON/API in real app)
  const recommendedComps = [
    {
      id: 1,
      title: "Pro Haven Control",
      description: "VCT 2022 common composition focused on map control.",
      map: havenMap,
      agents: [
        { name: "Omen", img: omenImg },
        { name: "Jett", img: jettImg },
        { name: "Chamber", img: chamberImg },
        { name: "Sova", img: sovaImg },
        { name: "Sage", img: sageImg }
      ]
    },
    {
      id: 2,
      title: "Bind Defensive Setup",
      description: "Strong defensive setup with high control and information.",
      map: bindMap,
      agents: [
        { name: "Brimstone", img: brimstoneImg },
        { name: "Raze", img: razeImg },
        { name: "Chamber", img: chamberImg },
        { name: "Skye", img: skyeImg },
        { name: "Viper", img: viperImg }
      ]
    },
    {
      id: 3,
      title: "Fracture Split Push",
      description: "Balanced composition with great flexibility for attacking from multiple angles.",
      map: fractureMap,
      agents: [
        { name: "Brimstone", img: brimstoneImg },
        { name: "Phoenix", img: phoenixImg },
        { name: "Jett", img: jettImg },
        { name: "Killjoy", img: killjoyImg },
        { name: "Skye", img: skyeImg }
      ]
    }
  ];

  return (
    <div className="recommended-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Recommended Compositions</h1>
        <p className="subtitle">Pro player and high-rank team compositions</p>
      </section>

      {/* Recommendations by Map Section */}
      <section className="recommendations-container">
        <h2 className="section-title">Top Meta Compositions</h2>
        
        {recommendedComps.map(comp => (
          <CompItem 
            key={comp.id}
            title={comp.title}
            description={comp.description}
            agents={comp.agents}
            map={comp.map}
          />
        ))}
      </section>
    </div>
  );
};

export default Recommended; 