const API_BASE = 'http://localhost:5000/api';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch(`${API_BASE}/listings/${id}`);
  const listing = await res.json();
  document.getElementById('listing-details').innerHTML = `
    <h2>${listing.title}</h2>
    <img src="${listing.image || 'images/placeholder.jpg'}" class="img-fluid mb-3" alt="${listing.title}">
    <p><strong>Description:</strong> ${listing.description}</p>
    <p><strong>Location:</strong> ${listing.location}</p>
    <p><strong>Price:</strong> $${listing.price}</p>
    <p><strong>Type:</strong> ${listing.room_type}</p>
    <p><strong>Contact:</strong> ${listing.contact_email}</p>
    <p><strong>Amenities:</strong> ${listing.wifi ? 'Wi-Fi ' : ''}${listing.ac ? 'AC' : ''}</p>
    <p><strong>Rating:</strong> ${listing.rating_count > 0 ? (listing.rating_total / listing.rating_count).toFixed(1) : 'No ratings'}</p>
  `;

  // Initialize map
  const map = L.map('map').setView([listing.latitude || 0, listing.longitude || 0], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker([listing.latitude || 0, listing.longitude || 0]).addTo(map).bindPopup(listing.title).openPopup();

  // Rating stars
  const starsContainer = document.getElementById('rating-stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = '★';
    star.dataset.value = i;
    star.addEventListener('click', () => selectStars(i));
    starsContainer.appendChild(star);
  }

  document.getElementById('rateBtn').addEventListener('click', async () => {
    if (!token) return alert('Login required');
    const stars = document.querySelector('.star.selected')?.dataset.value;
    if (!stars) return alert('Select stars');
    await fetch(`${API_BASE}/ratings/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ stars: parseInt(stars) })
    });
    alert('Rated!');
    location.reload();
  });
});

function selectStars(value) {
  document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('selected');
    if (star.dataset.value <= value) {
      star.classList.add('selected');
    }
  });
}


function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}