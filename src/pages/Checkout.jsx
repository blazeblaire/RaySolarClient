import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../services/api';
import CustomerNavbar from '../components/customer/CustomerNavbar';
import './Checkout.css';

const checkoutSchema = z.object({
  paymentMethod: z.enum(['mpesa', 'card', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
  shippingAddress: z.string().min(10, 'Please enter a complete address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
});

function Checkout() {
  const { user, logout } = useAuth();
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const shipping = 1000;
  const tax = subtotal * 0.01;
  const total = subtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'mpesa',
      phoneNumber: user?.phone || '',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const onSubmit = async (data) => {
    setIsProcessing(true);
    setError('');

    try {
      const response = await api.post('/customer/checkout', {
        payment_method: data.paymentMethod,
        shipping_address: data.shippingAddress,
        phone_number: data.phoneNumber,
      });

      // Clear cart
      await clearCart();

      // Navigate to success page with order details
      navigate('/order-success', {
        state: { order: response.data.order },
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>No items in cart</h2>
          <p>Add some products before checking out</p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <CustomerNavbar activePage="checkout" />

      {/* Yellow Banner */}
      <div className="page-banner-shop">
        <h2>Checkout</h2>
      </div>

      {/* Main Content */}
      <div className="checkout-container">
        <div className="checkout-main">
          <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
            {/* Payment Method */}
            <div className="checkout-section">
              <h3>Payment Method</h3>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="payment-methods">
                <label
                  className={`payment-option ${
                    selectedPaymentMethod === 'mpesa' ? 'selected' : ''
                  }`}
                >
                  <input type="radio" value="mpesa" {...register('paymentMethod')} />
                  <div className="payment-content">
                    <div className="payment-icon mpesa">M-PESA</div>
                    <span>M-PESA Payment</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${
                    selectedPaymentMethod === 'card' ? 'selected' : ''
                  }`}
                >
                  <input type="radio" value="card" {...register('paymentMethod')} />
                  <div className="payment-content">
                    <div className="payment-icon card">💳</div>
                    <span>Credit/Debit Card</span>
                  </div>
                </label>

                <label
                  className={`payment-option ${
                    selectedPaymentMethod === 'paypal' ? 'selected' : ''
                  }`}
                >
                  <input type="radio" value="paypal" {...register('paymentMethod')} />
                  <div className="payment-content">
                    <div className="payment-icon paypal">PayPal</div>
                    <span>PayPal</span>
                  </div>
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="form-error">{errors.paymentMethod.message}</p>
              )}
            </div>

            {/* Shipping Address */}
            <div className="checkout-section">
              <h3>Shipping Address</h3>
              <textarea
                className={`form-textarea ${errors.shippingAddress ? 'error' : ''}`}
                placeholder="Enter your complete shipping address..."
                rows="4"
                {...register('shippingAddress')}
              />
              {errors.shippingAddress && (
                <p className="form-error">{errors.shippingAddress.message}</p>
              )}
            </div>

            {/* Contact Phone */}
            <div className="checkout-section">
              <h3>Contact Phone Number</h3>
              <input
                type="tel"
                className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
                placeholder="+254 700 000 000"
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className="form-error">{errors.phoneNumber.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : `Pay kes. ${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="checkout-sidebar">
          <div className="order-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="item-name">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="item-price">
                    kes. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>kes. {subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>kes. {shipping.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Tax (1%)</span>
              <span>kes. {tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>kes. {total.toLocaleString()}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
