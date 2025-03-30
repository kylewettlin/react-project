import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MyComps from './pages/MyComps/MyComps';
import BuildComps from './pages/BuildComps/BuildComps';
import Recommended from './pages/Recommended/Recommended';
import AgentList from './pages/AgentList/AgentList';
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-comps" element={<MyComps />} />
            <Route path="/build-comps" element={<BuildComps />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route path="/agent-list" element={<AgentList />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
