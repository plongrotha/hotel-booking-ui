# Hotel Booking UI

A modern, responsive hotel booking web application built with Angular. This project allows users to search for hotels, view details, book rooms, and manage their bookings. It also features authentication, user profiles, and an admin panel for hotel management.

## Features

- **Hotel Search & Booking:**
  - Search hotels by destination, date, and guests
  - View hotel details, rooms, and availability
  - Book rooms and manage your reservations
- **User Authentication:**
  - Sign up and sign in with secure authentication
  - User roles (guest, owner, admin)
- **Profile Management:**
  - View and update user profile
  - View booking history
- **Admin & Owner Panel:**
  - Manage hotels, rooms, and bookings
  - View statistics and reports
- **Attraction Explorer:**
  - Discover local attractions and details
- **Responsive Design:**
  - Mobile-friendly and accessible UI
- **Modern Stack:**
  - Angular 19, Tailwind CSS, FontAwesome, RxJS
  - E2E testing with Cypress

## Project Structure

- `src/app/features/` — Feature modules (home, hotel, booking, profile, admin, etc.)
- `src/app/core/` — Core services, models, and interceptors
- `src/app/shared/` — Shared components (navbar, footer, buttons, etc.)
- `public/` — Static assets
- `cypress/` — E2E tests and configuration

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The app will be available at [http://localhost:4200](http://localhost:4200).

### Running Tests

- **Unit tests:**
  ```bash
  npm test
  ```
- **E2E tests (Cypress):**
  ```bash
  npx cypress open
  ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
