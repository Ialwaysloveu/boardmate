const API_BASE = 'http://localhost:5000/api';
let token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async () => {
  if (!token) return alert('Login required');
  // Assuming we have a way to get user ID from token or another endpoint; for simplicity, fetch all and filter client-side (in production, add a /users/me endpoint)
  const res = await fetch(`${API_BASE}/listings`, { headers: { 'Authorization': `Bearer ${token}` } });
  const listings = await res.json();
  // In a real app, filter by userId; here, assuming all are user's for demo
  const container = document.getElementById('user-listings');
  listings.forEach(listing => {
    const card = `
      <div class="col-md-4">
        <div class="card">
          <img src="${listing.image || 'images/placeholder.jpg'}" class="card-img-top" alt="${listing.title}">
          <div class="card-body">
            <h5>${listing.title}</h5>
            <p>${listing.location} - $${listing.price}</p>
            <button class="btn btn-danger btn-sm" onclick="deleteListing(${listing.id})">Delete</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
});

async function deleteListing(id) {
  await fetch(`${API_BASE}/listings/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  location.reload();
}


function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}