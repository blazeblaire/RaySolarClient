import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/customer/ProductCard';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import './CustomerShop.css';

function CustomerShop() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minWattage: '',
    maxWattage: '',
  });
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (filters.minPrice) params.append('min_price', filters.minPrice);
      if (filters.maxPrice) params.append('max_price', filters.maxPrice);
      if (filters.minWattage) params.append('min_wattage', filters.minWattage);
      if (filters.maxWattage) params.append('max_wattage', filters.maxWattage);

      const response = await api.get(`/customer/products?${params}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minWattage: '',
      maxWattage: '',
    });
    setSearchTerm('');
    setTimeout(fetchProducts, 0);
  };

  return (
    <div className="customer-shop">
      <CustomerNavbar activePage="shop" />

      {/* Yellow Banner */}
      <div className="page-banner-shop">
        <h2>Solar Products</h2>
        <div className="banner-actions-shop">
          <button className="banner-btn active">
            Cart : {cartCount} Items
          </button>
          <button className="banner-btn">Default</button>
          <button className="banner-btn">
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="banner-btn"
          >
            {viewMode === 'grid' ? 'List' : 'Grid'} view
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="shop-container">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <ul className="sidebar-nav">
              <li><a href="#" className="active">Solar Products</a></li>
              <li><a href="#" onClick={() => navigate('/cart')}>Shopping Cart</a></li>
              <li><a href="#">Order History</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#" onClick={logout}>Log-out</a></li>
            </ul>
          </div>

          {/* Search */}
          <div className="sidebar-section">
            <h3>Search</h3>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Filters */}
          <div className="sidebar-section">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Price Range (KES)</label>
              <div className="filter-row">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Wattage (W)</label>
              <div className="filter-row">
                <input
                  type="number"
                  name="minWattage"
                  placeholder="Min"
                  value={filters.minWattage}
                  onChange={handleFilterChange}
                />
                <span>-</span>
                <input
                  type="number"
                  name="maxWattage"
                  placeholder="Max"
                  value={filters.maxWattage}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={applyFilters} className="btn btn-primary btn-sm">
                Apply
              </button>
              <button onClick={clearFilters} className="btn btn-outline btn-sm">
                Clear
              </button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="shop-main">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No products found</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`products-grid ${viewMode}`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Trust Badges Footer */}
      <footer className="trust-footer">
        <div className="trust-badge">
          <div className="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>SUPPORT 24/7</strong>
            <p>Live contact/message</p>
          </div>
        </div>

        <div className="trust-badge">
          <div className="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>24 HOURS RETURN</strong>
            <p>100% money-back guarantee</p>
          </div>
        </div>

        <div className="trust-badge">
          <div className="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>SECURE PAYMENT</strong>
            <p>Your money is safe</p>
          </div>
        </div>

        <div className="trust-badge">
          <div className="badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <div className="badge-text">
            <strong>FASTED DELIVERY</strong>
            <p>Delivery in 24/H</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CustomerShop;
