# TrendTrove To-Do List

This document tracks the progress of the TrendTrove project, based on the phased development plan.

## Phase 1: Minimum Viable Product (MVP)

### User Authentication
- **Backend (`user-service`)**
  - [x] `User` entity with email, hashed password.
  - [x] `UserService` for user CRUD and validation.
  - [x] `AuthController` for registration and login endpoints.
  - [x] JWT-based authentication for securing endpoints.
- **Frontend (`website`)**
  - [x] Registration page with form.
  - [x] Login page with form.
  - [x] Logic to call backend API for registration/login.
  - [x] Logic to store and manage JWT in the browser.

### Product Discovery
- **Backend (`trend-analysis-service`)**
  - [x] Define a `Product` entity (name, description, price, images, specs).
  - [x] Create `ProductService` for product CRUD.
  - [x] Create `ProductController` with endpoints for product lists and details.
  - [x] Implement a mechanism to periodically fetch and store trending products from external APIs.
- **Frontend (`website`)**
  - [x] Product listing page (grid view).
  - [x] Product detail page.
  - [x] Logic to fetch product data from the backend.

### E-commerce Core
- **Backend (new service: `order-service`)**
  - [x] `Order` entity (user, products, total price, status).
  - [x] `Cart` entity for shopping cart contents.
  - [x] `OrderService` for order CRUD.
  - [x] `CartService` for cart management.
  - [x] `CheckoutController` to handle checkout.
  - [x] Integrate with Stripe.
- **Frontend (`website`)**
  - [x] Shopping cart component.
  - [x] Checkout page with shipping/payment form.
  - [x] Logic to call backend for cart and order management.

### Platforms
- **Android App**
  - [ ] Set up new Android project.
  - [ ] Implement user authentication screens.
  - [ ] Implement product discovery screens.
  - [ ] Implement e-commerce core features.
- **Responsive Website**
  - [x] Set up Next.js project.
  - [x] Use Tailwind CSS for responsive design.

### Admin Panel (Basic)
- **Backend (new service: `admin-service`)**
  - [x] Endpoints for product management (CRUD).
  - [x] Endpoints for viewing and managing orders.
- **Frontend (`website`)**
  - [ ] Admin dashboard for product management.
  - [ ] Admin dashboard for order management.

## Phase 2: Enhancing User Experience and Engagement

### Enhanced Authentication
- **Backend (`user-service`)**
  - [ ] Integrate with Google and Facebook OAuth.
  - [ ] Update `AuthController` for social login callbacks.
- **Frontend (`website`)**
  - [ ] Add "Login with Google/Facebook" buttons.

### Personalization
- **Backend (`user-service`)**
  - [ ] `Preferences` entity for user's preferred categories.
  - [ ] Update `UserService` to manage preferences.
  - [ ] `Wishlist` entity for wishlisted products.
  - [ ] `WishlistService` to manage wishlists.
- **Backend (`trend-analysis-service`)**
  - [ ] Algorithm for personalized product feed.
- **Frontend (`website`)**
  - [ ] User profile page for setting preferred categories.
  - [ ] Wishlist page.
  - [ ] Update product listing page to display personalized feed.

### User Interaction
- **Backend (new service: `review-service`)**
  - [ ] `Review` entity (user, product, rating, comment).
  - [ ] `ReviewService` for review CRUD.
- **Frontend (`website`)**
  - [ ] Review section on product detail page.
  - [ ] Form for submitting reviews.

### UI/UX Improvements
- **Frontend (`website`)**
  - [ ] Conduct user testing.
  - [ ] Refine UI/UX based on feedback.

## Phase 3: Automation and Scaling

### Trend Analysis and Sourcing
- **Backend (`trend-analysis-service`)**
  - [ ] Implement a more sophisticated trend analysis algorithm.
  - [ ] Integrate with multiple external APIs for product data.

### Admin Panel (Advanced)
- **Backend (`admin-service`)**
  - [ ] Endpoints for viewing analytics (sales, customers, product trends).
  - [ ] Endpoints for managing suppliers.
- **Frontend (`website`)**
  - [ ] Comprehensive admin dashboard with analytics charts.
  - [ ] Admin dashboard for managing suppliers.

### Platform Expansion
- **Backend (`order-service`)**
  - [ ] Integrate with multiple payment gateways.
  - [ ] Add support for multiple currencies and languages.

### Improved Search
- **Backend (`product-service`)**
  - [ ] Implement advanced search and filtering (price, rating, etc.).
- **Frontend (`website`)**
  - [ ] Add search bar to product listing page.
  - [ ] Add filtering options to product listing page.

## Phase 4: Full-Featured Platform and Optimization

### Customer Support
- **Backend (new service: `support-service`)**
  - [ ] `Ticket` entity for customer support tickets.
  - [ ] `SupportService` to manage tickets.
- **Frontend (`website`)**
  - [ ] Customer support page with a form for submitting tickets.

### Marketing and Promotions
- **Backend (new service: `marketing-service`)**
  - [ ] `Discount` entity for promotional codes.
  - [ ] `MarketingService` to manage promotional campaigns.
- **Frontend (`website`)**
  - [ ] Add a field for entering discount codes at checkout.

### Performance and Optimization
- **Backend**
  - [ ] Implement caching strategies.
  - [ ] Implement performance monitoring and logging.
- **Frontend (`website`)**
  - [ ] Conduct A/B testing.

### Infrastructure
- [ ] Set up a CI/CD pipeline.
- [ ] Scale infrastructure.
