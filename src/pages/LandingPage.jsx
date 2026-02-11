import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <nav className="landing-nav">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">☀️</span>
              <span className="logo-text">Ray Solar Solutions</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#impact">Our Impact</a>
              <button onClick={() => navigate('/login')} className="btn-login">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="btn-get-started">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Power Your World with
              <span className="highlight"> Clean Solar Energy</span>
            </h1>
            <p className="hero-subtitle">
              Africa's leading marketplace for premium solar lighting solutions. 
              Connect with trusted providers, browse quality products, and light up 
              your home sustainably.
            </p>
            <div className="hero-cta">
              <button onClick={() => navigate('/register')} className="btn-primary-large">
                Start Shopping
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button onClick={() => navigate('/register')} className="btn-secondary-large">
                Become a Provider
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>10,000+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="stat">
                <strong>500+</strong>
                <span>Trusted Providers</span>
              </div>
              <div className="stat">
                <strong>50,000+</strong>
                <span>Products Sold</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">💡</div>
              <div className="card-content">
                <strong>Eco-Friendly</strong>
                <p>100% Solar Powered</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">⚡</div>
              <div className="card-content">
                <strong>Long Lasting</strong>
                <p>Up to 10 Hours</p>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🔒</div>
              <div className="card-content">
                <strong>Secure Payments</strong>
                <p>M-PESA & Card</p>
              </div>
            </div>
            <div className="hero-illustration">
              <div className="sun-icon">☀️</div>
              <div className="solar-panel"></div>
              <div className="energy-waves"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Ray Solar?</h2>
          <p className="section-subtitle">
            Everything you need for sustainable solar lighting in one place
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon yellow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h3>Wide Selection</h3>
              <p>Browse thousands of solar products from verified providers across Africa</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3>Quality Guaranteed</h3>
              <p>All products verified and approved by our expert team</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <h3>Secure Payments</h3>
              <p>M-PESA, Card, and PayPal integration for safe transactions</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon yellow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Get your solar products delivered within 24-48 hours</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Customer service team ready to help anytime you need</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3>Eco-Friendly</h3>
              <p>Join the movement towards sustainable energy in Africa</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in 3 simple steps</p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up as a customer or provider in less than a minute</p>
            </div>
            <div className="step-arrow">→</div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Browse & Shop</h3>
              <p>Explore verified solar products and add to cart</p>
            </div>
            <div className="step-arrow">→</div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Enjoy Solar Power</h3>
              <p>Receive your products and start saving with solar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="impact-section">
        <div className="section-container">
          <h2 className="section-title white-text">Our Environmental Impact</h2>
          <div className="impact-grid">
            <div className="impact-stat">
              <div className="impact-icon">🌍</div>
              <strong>500 Tons</strong>
              <p>CO₂ Emissions Saved</p>
            </div>
            <div className="impact-stat">
              <div className="impact-icon">⚡</div>
              <strong>2M kWh</strong>
              <p>Clean Energy Generated</p>
            </div>
            <div className="impact-stat">
              <div className="impact-icon">🏠</div>
              <strong>15,000+</strong>
              <p>Homes Powered</p>
            </div>
            <div className="impact-stat">
              <div className="impact-icon">🌳</div>
              <strong>25,000</strong>
              <p>Trees Equivalent</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Go Solar?</h2>
          <p>Join thousands of satisfied customers making the switch to clean energy</p>
          <button onClick={() => navigate('/register')} className="btn-cta">
            Get Started Today
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Ray Solar Solutions</h4>
            <p>Powering Africa with sustainable solar energy</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#impact">Our Impact</a>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <a href="#" onClick={() => navigate('/login')}>Customer Support</a>
            <a href="#" onClick={() => navigate('/register')}>Become a Provider</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@raysolarsolutions.com</p>
            <p>Phone: +254 700 000 000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Ray Solar Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
