
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated || user?.role !== 'customer') {
      alert('Please login as a customer to add items to cart');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card-customer">
      {/* Product Image */}
      <div className="product-card-image">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} />
        ) : (
          <div className="no-image">
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}

        {/* Wishlist Icon */}
        <button className="wishlist-btn">
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Cart Icon */}
        <button className="cart-icon-btn">
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
        </button>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star filled">★</span>
            ))}
          </div>
          <span className="rating-count">(50,767)</span>
        </div>

        {/* Product Name */}
        <h3 className="product-name">{product.name}</h3>

        {/* Price */}
        <p className="product-price">kes. {parseFloat(product.price).toLocaleString()}</p>

        {/* More Details Button */}
        <button
          onClick={handleAddToCart}
          className="btn-more-details"
          disabled={isAdding || product.stock_quantity === 0}
        >
          {showSuccess ? (
            <>✓ Added to Cart</>
          ) : isAdding ? (
            'Adding...'
          ) : product.stock_quantity === 0 ? (
            'Out of Stock'
          ) : (
            <>
              Add to Cart →
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
