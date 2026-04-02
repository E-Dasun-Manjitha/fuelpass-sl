# FuelPass SL – National Fuel & Gas Tracker 🇱🇰

![CI Pipeline](https://github.com/E-Dasun-Manjitha/fuelpass-sl/actions/workflows/national_grid_ci.yml/badge.svg)
![Deploy to Production](https://img.shields.io/badge/Deploy%20to%20Production-passing-success?style=flat&logo=github)

FuelPass SL is a web-based dashboard developed to help Sri Lankans track fuel and LPG gas availability in real-time across the country. This project focuses on providing an easy-to-use, accessible interface for everyone, supporting all three national languages and working smoothly on both mobile and desktop devices.

---

## What’s New (Final Updates)

After several rounds of testing, I’ve implemented some important fixes to make the website production-ready:

### 📱 Full Mobile & Orientation Support
I noticed that the navigation menu and some dashboard buttons were getting cut off when rotating the phone to landscape (horizontal) mode. I have fixed this by updating the side-drawer’s CSS to be scrollable and properly adjusted for landscape views. Now, the dashboard fits perfectly on any screen size.

### 🌐 Trilingual Navigation Switcher
To make the site more accessible, I added a quick language switcher directly into the mobile navbar. You can now toggle between **English, සිංහල (Sinhala), and தமிழ் (Tamil)** with just one tap from any page.

### 🗺️ Improved Map View
The map was previously zooming in too far, cutting off the coastal areas. I’ve updated the map calculation logic to guarantee that the entire island of Sri Lanka is visible with enough "breathing room" around the borders, making it much easier to find stations in any district.

### 🛡️ Security Hardening
I’ve added two new layers of security to the backend to protect the system from basic attacks:
- **Helmet.js**: This adds security headers to prevent common web vulnerabilities like clickjacking and cross-site scripting.
- **Rate-Limiting**: I’ve added a shield to the login and report forms so that automated bots cannot spam or try to guess passwords multiple times.

---

## Features
- **Real-Time Tracking**: See current stock levels for Petrol, Diesel, and LPG Gas.
- **Trilingual Support**: Full translations for English, Sinhala, and Tamil.
- **Interactive Map**: View all stations on a responsive map (Leaflet.js).
- **Mobile Responsive**: Fully optimized for mobile phones, tablets, and PCs.
- **Admin & Owner Portals**: Secure areas for station owners to update their stock.

---

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Leaflet.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Hosting**: Vercel (Frontend), Render (Backend)

---

## How to Run Regionally

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/E-Dasun-Manjitha/fuelpass-sl.git
   ```

2. **Setup the Backend**:
   - Go to the `backend` folder.
   - Run `npm install`.
   - Setup your `.env` with a `JWT_SECRET` and `DATABASE_URL`.
   - Run `npm start`.

3. **Open the Frontend**:
   - Simply open `index.html` in your browser.

---

## Live Demo
You can visit the live website here: [https://fuelpass-sl.vercel.app/](https://fuelpass-sl.vercel.app/)

**"Helping Sri Lanka stay informed."** 🇱🇰🏆🏁🚀🎨🔥
