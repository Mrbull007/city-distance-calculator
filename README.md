# City Distance Calculator 🗺️

**A simple, fast, and fully client-side web app to measure the straight-line (great-circle) distance between any two cities in the world.**

No API keys, no backend, no installation hassle. Just open it in your browser and start calculating!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Crypto_is_Futur/city-distance-calculator)](https://github.com/Crypto_is_Futur/city-distance-calculator)
[![GitHub forks](https://img.shields.io/github/forks/Crypto_is_Futur/city-distance-calculator)](https://github.com/Crypto_is_Futur/city-distance-calculator)

![Demo GIF](https://github.com/Crypto_is_Futur/city-distance-calculator/raw/main/screenshots/demo.gif)  
*(Replace the GIF link with your actual demo recording after you build the app)*

## ✨ Features

- ✅ Enter **any city name** (e.g., "Mumbai", "New York, USA", "Bhavnagar, India")
- ✅ Automatic geocoding using free OpenStreetMap Nominatim API
- ✅ Instant distance calculation in **Kilometers** and **Miles**
- ✅ Displays latitude & longitude of both cities
- ✅ Clean, modern, fully responsive UI (mobile + desktop)
- ✅ Error handling (invalid city names, same cities, network issues)
- ✅ Dark/Light mode toggle
- ✅ Copy result button
- ✅ Works completely offline after first load (cached via service worker – optional)
- ✅ Zero dependencies (only Tailwind CSS via CDN)

## 🛠️ Technologies Used

| Technology       | Purpose                          |
|------------------|----------------------------------|
| HTML5 + CSS3     | Structure & Styling             |
| Tailwind CSS     | Modern UI (via CDN)             |
| Vanilla JavaScript (ES6+) | Core logic & API calls |
| Nominatim API    | Free city → coordinates lookup  |
| Haversine Formula| Accurate distance calculation   |

## 📐 How It Works

1. You enter two city names.
2. The app calls **Nominatim** (OpenStreetMap) to convert city names into latitude/longitude.
3. The **Haversine formula** calculates the straight-line distance on Earth’s surface:

$$
d = 2r \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos\phi_1 \cdot \cos\phi_2 \cdot \sin^2\left(\frac{\Delta\lambda}{2}\right)}\right)
$$

Where:
- \(\phi_1, \phi_2\) = latitudes in radians
- \(\lambda_1, \lambda_2\) = longitudes in radians
- \(r\) = Earth’s radius = **6371 km**

4. Result is converted to miles and shown instantly.

**Note:** This gives “as-the-crow-flies” distance (not road distance).

## 🚀 Quick Start (Installation)

### Option 1: Run Locally (Recommended for development)
```bash
# 1. Clone the repository
git clone https://github.com/Crypto_is_Futur/city-distance-calculator.git
cd city-distance-calculator

# 2. Open the file
# Just double-click index.html OR run:
# (optional) python -m http.server 8000
