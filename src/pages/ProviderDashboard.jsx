import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ProviderProfileForm from '../components/provider/ProviderProfileForm';
import ProductForm from '../components/provider/ProductForm';
import './ProviderDashboard.css';

function ProviderDashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeView, setActiveView] = useState('products'); // products, addProduct, editProduct, profile
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchProducts();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/provider/profile');
      setProfile(response.data.profile);
    } catch (error) {
      if (error.response?.status === 404) {
        setProfile(null);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/provider/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSuccess = () => {
    fetchProfile();
    setActiveView('products');
  };

  const handleProductSuccess = () => {
    fetchProducts();
    setActiveView('products');
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setActiveView('editProduct');
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/provider/products/${productId}`);
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  const getStatusBadge = (product) => {
    if (!product.is_active) {
      return <span className="status-badge inactive">Inactive</span>;
    }
    if (product.is_approved) {
      return <span className="status-badge approved">Approved</span>;
    }
    return <span className="status-badge pending">Pending Approval</span>;
  };

  return (
    <div className="provider-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="brand-logo">Ray Solar Solutions</h1>
          <span className="header-subtitle">Provider Dashboard</span>
        </div>
        <div className="header-actions">
          <span className="user-name">Welcome, {user?.full_name}</span>
          <button onClick={logout} className="btn btn-outline">
            Logout
          </button>
        </div>
      </header>

      {/* Yellow Banner */}
      <div className="page-banner">
        <h2>{activeView === 'products' ? 'My Products' : activeView === 'profile' ? 'Business Profile' : 'Add Product'}</h2>
        <div className="banner-actions">
          <button
            onClick={() => setActiveView('profile')}
            className={`btn ${activeView === 'profile' ? 'btn-secondary' : 'btn-outline'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveView('products')}
            className={`btn ${activeView === 'products' ? 'btn-secondary' : 'btn-outline'}`}
          >
            Products
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Profile View */}
        {activeView === 'profile' && (
          <ProviderProfileForm existingProfile={profile} onSuccess={handleProfileSuccess} />
        )}

        {/* Products List View */}
        {activeView === 'products' && (
          <div className="products-section">
            {!profile && (
              <div className="alert alert-warning">
                ⚠️ Please create your business profile before adding products.
                <button onClick={() => setActiveView('profile')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Create Profile
                </button>
              </div>
            )}

            {profile && !profile.is_approved && (
              <div className="alert alert-warning">
                ⏳ Your profile is pending admin approval. You can add products, but they won't be visible until your profile is approved.
              </div>
            )}

            {profile && profile.is_approved && (
              <button
                onClick={() => setActiveView('addProduct')}
                className="btn btn-primary"
                style={{ marginBottom: '2rem' }}
              >
                + Add New Product
              </button>
            )}

            {loading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <p>No products yet. Start by adding your first solar product!</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    {product.image_url && (
                      <div className="product-image">
                        <img src={product.image_url} alt={product.name} />
                      </div>
                    )}
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description.substring(0, 100)}...</p>
                      <div className="product-meta">
                        <span className="product-price">KES {parseFloat(product.price).toLocaleString()}</span>
                        {product.wattage && <span className="product-spec">{product.wattage}W</span>}
                        {getStatusBadge(product)}
                      </div>
                      <div className="product-actions">
                        <button onClick={() => handleEditProduct(product)} className="btn btn-outline btn-sm">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-outline btn-sm btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Product View */}
        {activeView === 'addProduct' && (
          <ProductForm
            onSuccess={handleProductSuccess}
            onCancel={() => setActiveView('products')}
          />
        )}

        {/* Edit Product View */}
        {activeView === 'editProduct' && selectedProduct && (
          <ProductForm
            existingProduct={selectedProduct}
            onSuccess={handleProductSuccess}
            onCancel={() => {
              setActiveView('products');
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProviderDashboard;
