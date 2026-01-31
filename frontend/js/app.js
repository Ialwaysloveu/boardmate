const API_BASE = 'http://localhost:5000/api'; // Update to live URL in production
let token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in; redirect to login if not
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  checkLoginStatus();
  loadListings();
  document.getElementById('searchBtn').addEventListener('click', () => {
    const search = document.getElementById('search').value;
    const type = document.getElementById('type').value;
    loadListings(search, type);
  });
});

async function loadListings(search = '', type = '') {
  const res = await fetch(`${API_BASE}/listings?search=${search}&type=${type}`);
  const listings = await res.json();
  const container = document.getElementById('listings');
  container.innerHTML = '';
  listings.forEach(listing => {
    const card = `
      <div class="col-md-4">
        <div class="card">
          <img src="${listing.image || 'images/placeholder.jpg'}" class="card-img-top lazy" alt="${listing.title}" loading="lazy">
          <div class="card-body">
            <h5>${listing.title}</h5>
            <p>${listing.location} - $${listing.price}</p>
            <p>Rating: ${listing.rating_count > 0 ? (listing.rating_total / listing.rating_count).toFixed(1) : 'No ratings'}</p>
            <a href="listing.html?id=${listing.id}" class="btn" style="background-color: #116c3a; color: white;">View</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
  lazyLoadImages();
}

function lazyLoadImages() {
  const images = document.querySelectorAll('.lazy');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  });
  images.forEach(img => observer.observe(img));
}

function checkLoginStatus() {
  if (token) {
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('signupLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'inline';
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}