import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.role === 'customer') {
      fetchCart();
    } else {
      setCartItems([]);
      setCartCount(0);
      setSubtotal(0);
    }
  }, [isAuthenticated, user]);

  const fetchCart = async () => {
    if (!isAuthenticated || user?.role !== 'customer') return;

    setLoading(true);
    try {
      const response = await api.get('/customer/cart');
      const { items, subtotal: total, item_count } = response.data;

      setCartItems(items || []);
      setCartCount(item_count);
      setSubtotal(total);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated || user?.role !== 'customer') {
      throw new Error('Please login as a customer to add items to cart');
    }

    try {
      await api.post('/customer/cart/add', {
        product_id: productId,
        quantity,
      });

      await fetchCart(); // Refresh cart
      return true;
    } catch (error) {
      throw error;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await api.put(`/customer/cart/update/${itemId}`, { quantity });
      await fetchCart(); // Refresh cart
      return true;
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/customer/cart/remove/${itemId}`);
      await fetchCart(); // Refresh cart
      return true;
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/customer/cart/clear');
      setCartItems([]);
      setCartCount(0);
      setSubtotal(0);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    cartItems,
    cartCount,
    subtotal,
    loading,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
