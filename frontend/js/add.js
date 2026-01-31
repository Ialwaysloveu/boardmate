const API_BASE = 'http://localhost:5000/api';
let token = localStorage.getItem('token');

// Initialize Leaflet map
document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([40.7128, -74.0060], 10); // Default to NYC
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let marker;

  map.on('click', async function(e) {
    const { lat, lng } = e.latlng;

    // Check if the location is on land (not water, snow, ice, or glaciers)
    const isLand = await checkIfLand(lat, lng);
    if (!isLand) {
      alert('Please select a location on habitable land. Water, snow, ice, or glaciers are not allowed.');
      return;
    }

    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lng;

    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map).bindPopup('Selected Location').openPopup();
  });
});

// Function to check if the location is on habitable land using Nominatim reverse geocoding
async function checkIfLand(lat, lng) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
    const data = await response.json();
    // If no address details or it's water, snow, ice, or glacier, consider it not habitable land
    if (!data || !data.address) {
      return false;
    }
    const type = data.type;
    const category = data.category;
    // Block water bodies
    if (type === 'water' || category === 'natural' && type === 'water') {
      return false;
    }
    // Block snow, ice, or glaciers
    if (type === 'glacier' || type === 'ice' || type === 'snow' || category === 'natural' && (type === 'glacier' || type === 'ice' || type === 'snow')) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking land:', error);
    return false; // Default to not allowing if check fails
  }
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!token) return alert('Login required');
  const formData = new FormData(e.target);
  const res = await fetch(`${API_BASE}/listings`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  if (res.ok) {
    alert('Listing added!');
    window.location.href = 'profile.html';
  } else {
    alert('Error adding listing');
  }
});


function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}