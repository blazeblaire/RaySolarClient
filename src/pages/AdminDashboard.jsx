import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import api from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [pendingProviders, setPendingProviders] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('providers');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [providersRes, productsRes] = await Promise.all([
        api.get('/admin/providers/pending'),
        api.get('/admin/products/pending'),
      ]);
      setPendingProviders(providersRes.data.providers);
      setPendingProducts(productsRes.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProvider = async (profileId) => {
    try {
      await api.put(`/admin/providers/${profileId}/approve`);
      fetchData();
      alert('Provider approved successfully!');
    } catch (error) {
      alert('Failed to approve provider');
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await api.put(`/admin/products/${productId}/approve`);
      fetchData();
      alert('Product approved successfully!');
    } catch (error) {
      alert('Failed to approve product');
    }
  };

  const handleRejectProduct = async (productId) => {
    try {
      await api.put(`/admin/products/${productId}/reject`);
      fetchData();
      alert('Product rejected');
    } catch (error) {
      alert('Failed to reject product');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="brand-logo">Ray Solar Solutions</h1>
          <span className="header-subtitle">Admin Dashboard</span>
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
        <h2>Approval Management</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{pendingProviders.length}</span>
            <span className="stat-label">Pending Providers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{pendingProducts.length}</span>
            <span className="stat-label">Pending Products</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('providers')}
          className={`tab ${activeTab === 'providers' ? 'active' : ''}`}
        >
          Pending Providers ({pendingProviders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
        >
          Pending Products ({pendingProducts.length})
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {/* Providers Tab */}
            {activeTab === 'providers' && (
              <div className="approval-section">
                {pendingProviders.length === 0 ? (
                  <div className="empty-state">
                    <p>No pending provider approvals</p>
                  </div>
                ) : (
                  <div className="approval-grid">
                    {pendingProviders.map((provider) => (
                      <div key={provider.id} className="approval-card">
                        <h3>{provider.business_name}</h3>
                        <div className="card-info">
                          <p><strong>Owner:</strong> {provider.full_name}</p>
                          <p><strong>Email:</strong> {provider.email}</p>
                          {provider.business_address && (
                            <p><strong>Address:</strong> {provider.business_address}</p>
                          )}
                          {provider.tax_id && (
                            <p><strong>Tax ID:</strong> {provider.tax_id}</p>
                          )}
                          {provider.business_description && (
                            <p><strong>Description:</strong> {provider.business_description}</p>
                          )}
                          <p className="date-info">
                            <strong>Applied:</strong>{' '}
                            {new Date(provider.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleApproveProvider(provider.id)}
                          className="btn btn-primary btn-full"
                        >
                          Approve Provider
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="approval-section">
                {pendingProducts.length === 0 ? (
                  <div className="empty-state">
                    <p>No pending product approvals</p>
                  </div>
                ) : (
                  <div className="approval-grid">
                    {pendingProducts.map((product) => (
                      <div key={product.id} className="approval-card">
                        {product.image_url && (
                          <div className="product-preview-image">
                            <img src={product.image_url} alt={product.name} />
                          </div>
                        )}
                        <h3>{product.name}</h3>
                        <div className="card-info">
                          <p><strong>Provider:</strong> {product.business_name || product.provider_name}</p>
                          <p><strong>Price:</strong> KES {parseFloat(product.price).toLocaleString()}</p>
                          {product.wattage && <p><strong>Wattage:</strong> {product.wattage}W</p>}
                          {product.battery_capacity && (
                            <p><strong>Battery:</strong> {product.battery_capacity}</p>
                          )}
                          <p><strong>Description:</strong> {product.description}</p>
                          <p><strong>Stock:</strong> {product.stock_quantity}</p>
                          <p className="date-info">
                            <strong>Submitted:</strong>{' '}
                            {new Date(product.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="card-actions">
                          <button
                            onClick={() => handleApproveProduct(product.id)}
                            className="btn btn-secondary"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectProduct(product.id)}
                            className="btn btn-outline"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
