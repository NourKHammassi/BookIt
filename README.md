# BookIt

Full-stack hotel & apartment booking platform built with modern web technologies.

## Tech Stack

- **Frontend:** Next.js 15 (App Router, Server Components)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Auth:** NextAuth.js (coming soon)
- **Deployment:** Vercel

## Features

- [x] Database schema (Users, Properties, Bookings, Reviews, Amenities)
- [x] Properties API with filtering (city, guests)
- [ ] Authentication (Google + credentials)
- [ ] Property listing & search UI
- [ ] Booking flow
- [ ] User dashboard
- [ ] Admin panel
- [ ] Deployment

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your DATABASE_URL

# Run migrations
npx prisma migrate dev

# Seed sample data
# Visit http://localhost:3000/api/properties/seed

# Start dev server
npm run dev
```

## Database

![Schema](https://img.shields.io/badge/PostgreSQL-6_tables-blue)

- **User** — authentication + roles (USER, ADMIN)
- **Property** — listings with location, pricing, capacity
- **Booking** — date-based reservations with status tracking
- **Review** — one per user per property, with rating
- **Amenity** — reusable tags (WiFi, Pool, etc.)
- **PropertyAmenity** — many-to-many link