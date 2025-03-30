import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Contact Us</h1>
        <p className="subtitle">Have questions or feedback? Get in touch!</p>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="form-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>We're here to help with any questions about our Valorant team composition tools. Fill out the form and we'll get back to you as soon as possible.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-icon">✉️</span>
                <p>support@valorantcomps.com</p>
              </div>
              <div className="contact-method">
                <span className="method-icon">📱</span>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-method">
                <span className="method-icon">💬</span>
                <p>@ValorantComps</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send A Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your email address" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="What is this regarding?" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Your message" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 