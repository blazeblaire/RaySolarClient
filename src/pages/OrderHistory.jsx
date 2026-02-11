import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import './OrderHistory.css';

function OrderHistory() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/customer/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'pending';
      case 'cancelled':
        return 'danger';
      default:
        return 'pending';
    }
  };

  return (
    <div className="order-history-page">
      <CustomerNavbar activePage="orders" />

      {/* Yellow Banner */}
      <div className="page-banner-shop">
        <h2>Order History</h2>
        <button className="banner-btn" onClick={() => navigate('/shop')}>
          Continue Shopping
        </button>
      </div>

      {/* Main Content */}
      <div className="orders-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h3>No orders yet</h3>
            <p>Start shopping to see your order history</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.order_number}</h3>
                    <p className="order-date">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${getStatusColor(order.order_status)}`}>
                      {order.order_status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-items">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div key={index} className="order-item-row">
                          {item.image_url && (
                            <img
                              src={item.image_url}
                              alt={item.product_name}
                              className="order-item-image"
                            />
                          )}
                          <span className="item-details">
                            {item.product_name} × {item.quantity}
                          </span>
                          <span className="item-price">
                            kes. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="no-items">No items found</p>
                    )}
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total:</span>
                      <strong>kes. {parseFloat(order.total_amount).toLocaleString()}</strong>
                    </div>
                    <div className="order-actions">
                      <button className="btn btn-outline btn-sm">View Details</button>
                      <button
                        onClick={() =>
                          navigate('/support/new', {
                            state: { orderId: order.id, orderNumber: order.order_number },
                          })
                        }
                        className="btn btn-secondary btn-sm"
                      >
                        Get Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
