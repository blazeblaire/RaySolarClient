
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './CustomerNavbar.css';

function CustomerNavbar({ activePage }) {
  const { logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="shop-header">
      <div className="header-left">
        <h1 className="brand-logo" onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>
          Ray Solar Solutions
        </h1>
      </div>
      <nav className="header-nav">
        <a
          href="#"
          className={`nav-link ${activePage === 'shop' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); navigate('/shop'); }}
        >
          Shop
        </a>
        <a
          href="#"
          className={`nav-link ${activePage === 'orders' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); navigate('/orders'); }}
        >
          Orders
        </a>
        <a
          href="#"
          className={`nav-link ${activePage === 'support' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); navigate('/support/new'); }}
        >
          Support
        </a>
      </nav>
      <div className="header-actions">
        <button onClick={() => navigate('/cart')} className="cart-button">
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button onClick={logout} className="user-button">
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default CustomerNavbar;
