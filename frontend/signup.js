const API_BASE = 'http://localhost:5000/api'; // Update to live URL in production

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const messageDiv = document.getElementById('message');
  if (res.ok) {
    messageDiv.style.display = 'block';
    messageDiv.className = 'alert alert-success';
    messageDiv.textContent = 'Account created! Please log in.';
    setTimeout(() => window.location.href = 'login.html', 2000);
  } else {
    const error = await res.json();
    messageDiv.style.display = 'block';
    messageDiv.className = 'alert alert-danger';
    if (error.error && error.error.includes('Email already exists')) {
      messageDiv.innerHTML = 'Account already exists. <a href="login.html">Try logging in</a>';
    } else {
      messageDiv.textContent = 'Error creating account. Please try again.';
    }
  }
});

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('signupLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'inline';
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}