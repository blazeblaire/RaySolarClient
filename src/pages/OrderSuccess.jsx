import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import './OrderSuccess.css';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/shop');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="success-page">
      <CustomerNavbar activePage="orders" />
      <div className="success-container">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="order-details-card">
          <h3>Order Details</h3>
          <div className="detail-row">
            <span>Order Number:</span>
            <strong>{order.order_number}</strong>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <strong>kes. {parseFloat(order.total_amount).toLocaleString()}</strong>
          </div>
          <div className="detail-row">
            <span>Payment Method:</span>
            <strong>{order.payment_method.toUpperCase()}</strong>
          </div>
          <div className="detail-row">
            <span>Payment Status:</span>
            <span className="status-badge success">
              {order.payment_status.toUpperCase()}
            </span>
          </div>
          <div className="detail-row">
            <span>Order Status:</span>
            <span className="status-badge pending">
              {order.order_status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate('/orders')} className="btn btn-primary">
            View Order History
          </button>
          <button onClick={() => navigate('/shop')} className="btn btn-outline">
            Continue Shopping
          </button>
        </div>

        {/* Trust Badges */}
        <div className="success-footer">
          <div className="trust-badge-small">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span>24/7 Support</span>
          </div>

          <div className="trust-badge-small">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>Secure Payment</span>
          </div>

          <div className="trust-badge-small">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
