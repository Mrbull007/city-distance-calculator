// Haversine Formula to calculate distance
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distanceKm = R * c;

  return {
    km: distanceKm.toFixed(2),
    miles: (distanceKm * 0.621371).toFixed(2)
  };
}

// Get coordinates from city name using Nominatim
async function getCoordinates(city) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;
  
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'CityDistanceCalculator/1.0 (github.com/yourusername/city-distance-calculator)' }
    });
    
    if (!response.ok) throw new Error('Network error');
    
    const data = await response.json();
    if (data.length === 0) throw new Error('City not found');
    
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  } catch (error) {
    throw error;
  }
}

async function calculateDistance() {
  const fromInput = document.getElementById('from').value.trim();
  const toInput = document.getElementById('to').value.trim();
  const resultDiv = document.getElementById('result');

  if (!fromInput || !toInput) {
    showError("Please enter both cities");
    return;
  }

  if (fromInput.toLowerCase() === toInput.toLowerCase()) {
    showError("Both cities cannot be the same");
    return;
  }

  resultDiv.classList.add('hidden');
  resultDiv.innerHTML = `
    <div class="flex justify-center items-center py-8">
      <i class="fas fa-spinner fa-spin text-3xl text-indigo-600"></i>
      <span class="ml-3 text-lg">Finding cities and calculating...</span>
    </div>
  `;
  resultDiv.classList.remove('hidden');

  try {
    const [from, to] = await Promise.all([
      getCoordinates(fromInput),
      getCoordinates(toInput)
    ]);

    const distance = haversine(from.lat, from.lon, to.lat, to.lon);

    resultDiv.innerHTML = `
      <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6">
        <div class="flex items-center gap-2 text-green-700 dark:text-green-400 mb-4">
          <i class="fas fa-check-circle text-2xl"></i>
          <span class="font-semibold text-xl">Distance Calculated</span>
        </div>
        
        <div class="grid grid-cols-2 gap-6 text-center">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">From</p>
            <p class="font-medium">${from.displayName}</p>
            <p class="text-xs text-gray-400">${from.lat.toFixed(4)}, ${from.lon.toFixed(4)}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">To</p>
            <p class="font-medium">${to.displayName}</p>
            <p class="text-xs text-gray-400">${to.lat.toFixed(4)}, ${to.lon.toFixed(4)}</p>
          </div>
        </div>

        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div class="text-center">
            <p class="text-5xl font-bold text-indigo-600 dark:text-indigo-400">${distance.km} <span class="text-2xl">km</span></p>
            <p class="text-xl text-gray-600 dark:text-gray-400 mt-1">${distance.miles} miles</p>
          </div>
        </div>

        <button onclick="copyResult()" 
                class="mt-6 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition">
          <i class="fas fa-copy"></i> Copy Result
        </button>
      </div>
    `;
  } catch (error) {
    showError(error.message || "Failed to find one or both cities. Try adding country name (e.g. Bhavnagar, India)");
  }
}

function showError(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
      <i class="fas fa-exclamation-triangle text-3xl text-red-500 mb-3"></i>
      <p class="text-red-700 dark:text-red-400">${message}</p>
    </div>
  `;
  resultDiv.classList.remove('hidden');
}

function copyResult() {
  const resultText = document.querySelector('#result').innerText;
  navigator.clipboard.writeText(resultText).then(() => {
    const btn = document.querySelector('button[onclick="copyResult()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
  });
}

// Allow pressing Enter key
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') calculateDistance();
});
