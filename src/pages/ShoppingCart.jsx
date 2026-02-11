import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import './ShoppingCart.css';

function ShoppingCart() {
  const { user, logout } = useAuth();
  const { cartItems, subtotal, updateCartItem, removeFromCart, loading } = useCart();
  const navigate = useNavigate();
  const [updatingItems, setUpdatingItems] = useState({});

  const shipping = 1000; // Fixed shipping cost
  const tax = subtotal * 0.01; // 1% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update quantity');
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemove = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      try {
        await removeFromCart(itemId);
      } catch (error) {
        alert('Failed to remove item');
      }
    }
  };

  return (
    <div className="cart-page">
      <CustomerNavbar activePage="cart" />

      {/* Yellow Banner */}
      <div className="page-banner-shop">
        <h2>Shopping Cart</h2>
        <div className="banner-actions-shop">
          <button className="banner-btn active">
            Cart : {cartItems.length} Items
          </button>
          <button className="banner-btn">Default</button>
          <button className="banner-btn">Filter</button>
          <button className="banner-btn">List view</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-container">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <ul className="sidebar-nav">
              <li><a href="#" onClick={() => navigate('/shop')}>Solar Products</a></li>
              <li><a href="#" className="active">Shopping Cart</a></li>
              <li><a href="#">Order History</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#" onClick={logout}>Log-out</a></li>
            </ul>
          </div>
        </aside>

        {/* Cart Items */}
        <main className="cart-main">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button onClick={() => navigate('/shop')} className="btn btn-primary">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="cart-content">
              {/* Cart Items List */}
              <div className="cart-items-section">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} />
                      ) : (
                        <div className="no-image-small">📦</div>
                      )}
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p className="item-price">
                        ${item.price.toLocaleString()}/Collection
                      </p>
                      <div className="item-quantity">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || updatingItems[item.id]}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <span>{item.quantity} Collection</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={updatingItems[item.id]}
                          className="qty-btn"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="edit-btn"
                          title="Edit"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <p className="item-total-price">
                        kes. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary-card">
                <h3>Order summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>kes. {subtotal.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>kes. {shipping.toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Tax</span>
                  <span>kes. {tax.toFixed(2)}</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>kes. {total.toLocaleString()}</span>
                </div>

                <button className="btn btn-primary btn-full checkout-btn" onClick={() => navigate('/checkout')}>
                  Continue to payment →
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Trust Footer */}
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

export default ShoppingCart;