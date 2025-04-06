import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureCard.css';

const FeatureCard = ({ title, description, linkTo, linkText }) => {
  return (
    <div className="feature-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={linkTo} className="feature-link">{linkText}</Link>
    </div>
  );
};

export default FeatureCard; 