# FuelPass SL – National Fuel & Gas Tracker 🇱🇰

![CI Pipeline](https://github.com/E-Dasun-Manjitha/fuelpass-sl/actions/workflows/national_grid_ci.yml/badge.svg)
![Deploy to Production](https://img.shields.io/badge/Deploy%20to%20Production-passing-success?style=flat&logo=github)

FuelPass SL is a web-based dashboard developed to help Sri Lankans track fuel and LPG gas availability in real-time across the country. This project focuses on providing an easy-to-use, accessible interface for everyone, supporting all three national languages and working smoothly on both mobile and desktop devices.

---

## What’s New (Final Updates)

After several rounds of testing, I’ve implemented some important fixes to make the website production-ready:

### 🎨 Modern Human-Centric UI (v=50K)
The entire frontend has been modernized with a professional, human-centric aesthetic. We've moved away from AI-generated artifacts toward a clean "Inter" font design with high-contrast visibility. page titles and search suggestions are now fully accessible in both **Light and Dark themes**.

### ⚡ Optimized Dashboard & Quick Navigation
The main home page has been streamlined for high performance. We've removed redundant station lists to reduce scrolling and added two prominent **Quick Navigation** buttons:
- **Fuel Stations**: Jump directly to the specialized fuel tracking interface.
- **Gas Dealers**: Navigate straight to the LPG gas availability grid.
The **Find Nearest Station (GPS)** feature remains at the top for instant location-based lookups.

### 📱 Full Mobile & Orientation Support
The dashboard now fits perfectly on any screen size. I have updated the side-drawer’s CSS to be scrollable and properly adjusted for landscape views.

### 🌐 Trilingual Navigation Switcher
To make the site more accessible, I added a quick language switcher directly into the mobile navbar. You can now toggle between **English, සිංහල (Sinhala), and தமிழ் (Tamil)** with just one tap.

### 🗺️ Improved Map View
The map calculation logic now guarantees that the entire island of Sri Lanka is visible with enough "breathing room" around the borders.

---

## 📖 How to Use

If you are a first-time user, here is how to get the most out of FuelPass SL:

1. **Find Instant Availability (GPS)**: 
   - On the **Dashboard**, tap **"Find Nearest Fuel Station"**. 
   - Allow location access to see the closest stations sorted by distance with one-tap Google Maps directions.

2. **Explore the National Grid**:
   - Use the **"Fuel Stations"** or **"Gas Dealers"** buttons to see full lists across all districts.
   - You can filter by **District**, **Fuel Type**, or **Company (CPC/IOC)** to find exactly what you need.

3. **Check Prices & Quotas**:
   - Visit the **Prices** page to see the latest official rates set by the government.
   - Use the **Eligibility** tab to check your vehicle's weekly fuel quota and odd/even day rules.

4. **Help the Community**:
   - If you are at a station, use the **Report** page to share real-time queue status and stock levels with other citizens.

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
