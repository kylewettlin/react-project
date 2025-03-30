import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Valorant Team Composition Editor</h1>
        <p className="hero-subtitle">Create and Share Valorant Strategies</p>
      </section>

      {/* Carousel Section */}
      <Carousel />

      {/* Features Section */}
      <section className="features-section">
        <FeatureCard 
          title="Build Your Comps"
          description="Design, save, and share your own team compositions."
          linkTo="/build-comps"
          linkText="Start Building →"
        />

        <FeatureCard 
          title="Pro Strategies"
          description="Recommended team compositions gathered from ranked and professional data."
          linkTo="/recommended"
          linkText="View Recommendations →"
        />

        <FeatureCard 
          title="Agent Library"
          description="A library to view the agent choices with short descriptions of each."
          linkTo="/agent-list"
          linkText="Explore Agents →"
        />
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h2>Why Team Composition Matters</h2>
          <p>Team Composition is one of the most important parts of the game. Without the proper agents to set yourself up for success, you will quickly lose to the best team comps.</p>
          <p>This website will help you find and create the best team compositions to ensure success, whether you are competing in leagues or the ranked ladder.</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 