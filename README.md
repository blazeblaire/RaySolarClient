# Ray Solar Solutions - E-Commerce Platform

A full-stack e-commerce platform for solar lighting products, connecting customers with trusted solar product providers across Africa.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-18.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

### For Customers
- **Product Browsing** - Browse quality solar products with advanced search and filters
- **Shopping Cart** - Persistent cart with real-time updates
- **Multiple Payment Options** - M-PESA, Credit Card, PayPal
- **M-PESA Integration** - Real STK Push payments (Lipa Na M-PESA)
- **Order Tracking** - View order history and status
- **Support Tickets** - Direct communication with providers
- **Mobile Responsive** - Optimized for all devices

### For Providers
- **Business Dashboard** - Manage your solar products inventory
- **Product Management** - Add, edit, delete products with specifications
- **Approval Workflow** - Admin approval for profiles and products
- **Sales Analytics** - Track your sales and performance
- **Support System** - Respond to customer inquiries

### For Administrators
- **User Management** - Manage customers, providers, and admins
- **Approval System** - Approve provider profiles and products
- **Analytics Dashboard** - Platform-wide statistics and insights
- **Support Oversight** - Monitor and manage support tickets
- **Role-based Access Control** - Secure permission system

---

## Quick Start

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- pip (Python package manager)
- npm (Node package manager)

### Installation

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configurations

# Initialize database with Flask-Migrate
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Seed database with sample data
python seed_migrate.py

# Start backend server
python app.py
```

Backend will run on: http://localhost:5000

#### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: http://localhost:5173

---

## Default Login Credentials

After running `seed_migrate.py`, use these accounts:

### Admin Accounts
- **Email:** admin@gmail.com
  **Password:** Admin@2026

- **Email:** blaire.admin@gmail.com
  **Password:** Admin@2026

### Customer Account
- **Email:** john.kamau@gmail.com
  **Password:** Customer123

### Provider Account
- **Email:** solar.energy@gmail.com
  **Password:** Provider123

> **Important:** Change these passwords in production!

---

## M-PESA Integration

### Sandbox Testing (Pre-configured)

The platform comes with M-PESA sandbox credentials:

```
Shortcode: 174379
Passkey: bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
Test Phone: 254708374149
```

### Testing M-PESA Payments

1. Login as customer
2. Add products to cart
3. Proceed to checkout
4. Select "M-PESA" as payment method
5. Enter phone number: `254708374149`
6. Click "Pay"
7. Enter M-PESA PIN: `1234` (sandbox)
8. Payment will be processed automatically!

### Production Setup

To use real M-PESA in production:

1. Visit https://developer.safaricom.co.ke
2. Create an account
3. Create a new app
4. Get your credentials:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey
5. Update `.env` file:

```env
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=your_production_key
MPESA_CONSUMER_SECRET=your_production_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
```

---

## Database

### Technology Stack

- **ORM:** Flask-SQLAlchemy
- **Migrations:** Flask-Migrate
- **Database:** SQLite (development), PostgreSQL (production recommended)

### Database Models

1. **User** - Customers, Providers, Admins
2. **ProviderProfile** - Business information for providers
3. **Product** - Solar products catalog
4. **Order** - Customer orders with M-PESA integration
5. **OrderItem** - Order line items
6. **CartItem** - Shopping cart items
7. **SupportTicket** - Customer support tickets
8. **TicketResponse** - Support ticket responses

### Database Commands

```bash
# Create a new migration after model changes
flask db migrate -m "Description of changes"

# Apply migrations
flask db upgrade

# Rollback migration
flask db downgrade

# View migration history
flask db history

# Reset database (development only)
rm database.db
flask db upgrade
python seed_migrate.py
```

---

## Project Structure

```
solar-lighting-platform/
├── backend/
│   ├── models_sqlalchemy/         # SQLAlchemy models
│   │   ├── __init__.py           # Database initialization
│   │   ├── user.py               # User model
│   │   └── models.py             # Product, Order, Cart models
│   ├── routes/                   # API endpoints
│   │   ├── auth.py              # Authentication routes
│   │   ├── customer.py          # Customer routes
│   │   ├── provider.py          # Provider routes
│   │   ├── admin.py             # Admin routes
│   │   └── mpesa_routes.py      # M-PESA callbacks
│   ├── services/                 # Business logic
│   │   └── mpesa_service.py     # M-PESA integration
│   ├── middleware/               # Custom middleware
│   │   └── auth.py              # JWT authentication
│   ├── utils/                    # Utility functions
│   │   └── validators.py        # Input validators
│   ├── migrations/               # Database migrations
│   ├── app.py                    # Flask application
│   ├── config.py                 # Configuration
│   ├── seed_migrate.py           # Database seeding
│   └── requirements.txt          # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React Context
│   │   ├── services/           # API services
│   │   ├── styles/            # Global styles
│   │   └── App.jsx            # Main app component
│   ├── package.json           # Node dependencies
│   └── vite.config.js        # Vite configuration
└── README.md                  # This file
```

---

## Tech Stack

### Backend
- **Framework:** Flask 3.0
- **ORM:** Flask-SQLAlchemy 3.1
- **Migrations:** Flask-Migrate 4.0
- **Authentication:** Flask-JWT-Extended
- **Validation:** Marshmallow
- **CORS:** Flask-CORS
- **Payments:** M-PESA Daraja API

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **Forms:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Build Tool:** Vite

### Database
- **Development:** SQLite
- **Production:** PostgreSQL (recommended)

---

## API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user
```

### Customer
```
GET    /api/customer/products             - Browse products
POST   /api/customer/checkout             - Process checkout
GET    /api/customer/orders               - Get order history
POST   /api/customer/tickets              - Create support ticket
```

### Provider
```
POST   /api/provider/products      - Add new product
PUT    /api/provider/products/:id  - Update product
POST   /api/provider/tickets/:id/respond - Respond to ticket
```

### Admin
```
PUT    /api/admin/providers/:id/approve - Approve provider
PUT    /api/admin/products/:id/approve - Approve product
GET    /api/admin/analytics            - Get platform analytics
```

### M-PESA
```
POST   /api/mpesa/callback        - M-PESA payment callback
```

---

## Testing

### Manual Testing Workflow

1. **Register as Customer** → Browse products → Add to cart
2. **Checkout with M-PESA** → Phone: 254708374149 → PIN: 1234
3. **View Order History** → Check order status
4. **Provider Registration** → Add products → Wait for approval
5. **Admin Login** → Approve providers → Approve products

---

## Troubleshooting

### Backend won't start
```bash
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
```

### Database errors
```bash
rm database.db
flask db upgrade
python seed_migrate.py
```

### M-PESA errors
- Check phone format: 254XXXXXXXXX (no spaces)
- Verify credentials in .env file

---

## Creating Admin Users

```bash
cd backend
python database/create_admin.py
```

Or use seeded admins:
- admin@gmail.com / Admin@2026
- blaire.admin@gmail.com / Admin@2026

---

## Deployment

### Backend (Heroku)
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql
heroku config:set SECRET_KEY=xxx
git push heroku main
heroku run flask db upgrade
```

### Frontend (Vercel)
```bash
cd frontend
vercel
```

---

## License

MIT License - see LICENSE file for details

---

## Support

- Email: support@raysolarsolutions.com
- Phone: +254 700 000 000

---

## Roadmap

### v2.1 - Analytics & Notifications
- Advanced analytics dashboard
- Email notifications
- SMS notifications

### v2.2 - Enhanced Features
- Product reviews and ratings
- Wishlist functionality
- Multi-currency support

### v3.0 - Mobile & AI
- Mobile app (React Native)
- AI-powered recommendations
- Real-time chat support

---

**Built for sustainable energy in Africa**

**Version:** 2.0.0
**Last Updated:** February 2026
**Status:** Production Ready
