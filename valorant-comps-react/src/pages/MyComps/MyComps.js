import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompItem from '../../components/CompItem/CompItem';
import './MyComps.css';

// Import sample images for the example (these will be used as fallbacks if needed)
import havenMap from '../../assets/images/maps/Haven.png';
import ascendMap from '../../assets/images/maps/Ascent.png';
import brimstoneImg from '../../assets/images/agents/Brimstone.png';
import phoenixImg from '../../assets/images/agents/Phoenix.png';
import jettImg from '../../assets/images/agents/Jett.png';
import chamberImg from '../../assets/images/agents/Chamber.png';
import killjoyImg from '../../assets/images/agents/Killjoy.png';
import sovaImg from '../../assets/images/agents/Sova.png';
import sageImg from '../../assets/images/agents/Sage.png';

const MyComps = () => {
  const [myComps, setMyComps] = useState([]);

  useEffect(() => {
    // Load compositions from localStorage
    const savedComps = JSON.parse(localStorage.getItem('myComps')) || [];
    setMyComps(savedComps);
  }, []);

  // Example fallback comp data (will only be used if no saved comps found)
  const exampleComps = [
    {
      id: 1,
      title: "Haven Full Control",
      description: "Focus on controlling the three sites with strong sentinel and controller agents.",
      map: havenMap,
      agents: [
        { name: "Brimstone", img: brimstoneImg },
        { name: "Phoenix", img: phoenixImg },
        { name: "Jett", img: jettImg },
        { name: "Killjoy", img: killjoyImg },
        { name: "Sage", img: sageImg }
      ]
    }
  ];

  // Delete a comp
  const deleteComp = (id) => {
    const updatedComps = myComps.filter(comp => comp.id !== id);
    setMyComps(updatedComps);
    localStorage.setItem('myComps', JSON.stringify(updatedComps));
  };

  return (
    <div className="my-comps-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>My Compositions</h1>
        <p className="subtitle">View and manage your custom agent compositions</p>
      </section>

      {/* Add New Comp Button */}
      <div className="add-comp-container">
        <Link to="/build-comps" className="add-comp-btn">
          + Create New Composition
        </Link>
      </div>

      {/* My Comps List */}
      <section className="comps-container">
        {myComps.length > 0 ? (
          myComps.map(comp => (
            <div key={comp.id} className="comp-wrapper">
              <CompItem 
                title={comp.title}
                description={comp.description}
                agents={comp.agents}
                map={comp.map}
              />
              <button 
                className="delete-comp-btn" 
                onClick={() => deleteComp(comp.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          // Show example if no saved comps
          <>
            <div className="empty-state">
              <h2>No compositions yet</h2>
              <p>Create your first team composition by clicking the button above, or check out the example below!</p>
            </div>
            {exampleComps.map(comp => (
              <CompItem 
                key={comp.id}
                title={comp.title}
                description={comp.description}
                agents={comp.agents}
                map={comp.map}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default MyComps; 