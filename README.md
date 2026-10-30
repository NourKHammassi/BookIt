# BookIt

Full-stack hotel & apartment booking platform for the Tunisian market. Browse properties, book stays with Stripe, manage listings as an admin.

🌐 **Live:** [book-it-rouge-one.vercel.app](https://book-it-rouge-one.vercel.app)

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, API Routes)
- **Language:** TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Google OAuth + credentials)
- **Payments:** Stripe (test mode checkout)
- **Images:** Cloudinary (upload, optimization, CDN)
- **Maps:** Leaflet + OpenStreetMap
- **Styling:** Tailwind CSS
- **Deployment:** Vercel + Neon PostgreSQL

## Features

### User
- Browse and search properties with filters (city, guests, price, bedrooms)
- Interactive map view with price markers (Leaflet)
- Property detail page with photo gallery, amenities, reviews
- Book a stay with Stripe checkout (test mode)
- Favorites/wishlist with heart button
- View and cancel bookings
- Leave reviews and ratings
- Google OAuth + email/password auth

### Admin
- Dashboard with stats (properties, bookings, users, revenue)
- Add, edit, delete properties with image upload
- Manage bookings (confirm, cancel)
- Role-based access control

### Technical
- Fully responsive design (mobile, tablet, desktop)
- Cloudinary image upload with drag-and-drop
- Stripe Checkout integration with booking confirmation
- Leaflet map with custom price markers and popups
- Prisma ORM with type-safe queries
- Server Components + Client Components architecture

## Getting Started

```bash
# Clone
git clone https://github.com/NourKHammassi/BookIt.git
cd BookIt

# Install
npm install

# Environment
cp .env.example .env
# Fill in: DATABASE_URL, AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET,
# CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
# STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, NEXTAUTH_URL

# Database
npx prisma db push

# Dev server
npm run dev
```

## Database Schema

- **User** — auth, roles (USER/ADMIN), profile
- **Property** — listings with location, pricing, capacity, images, coordinates
- **Booking** — date-based reservations with Stripe payment, status tracking
- **Review** — one per user per property, rating + comment
- **Favorite** — user wishlist
- **Amenity** — reusable tags (WiFi, Pool, etc.)
- **PropertyAmenity** — many-to-many link

## Test Payment

Use Stripe test card: `4242 4242 4242 4242`, any future expiry, any CVC.
