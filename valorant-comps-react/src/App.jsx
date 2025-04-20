import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import MyComps from "./pages/MyComps/MyComps.jsx";
import BuildComps from "./pages/BuildComps/BuildComps.jsx";
import Recommended from "./pages/Recommended/Recommended.jsx";
import AgentList from "./pages/AgentList/AgentList.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import './App.css';

function App() {
  return (
    <Router basename="/react-project">
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
