const API_BASE = 'http://localhost:5000/api'; // Update to live URL in production

document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const messageDiv = document.getElementById('message');
  if (res.ok) {
    const { token } = await res.json();
    localStorage.setItem('token', token);
    messageDiv.style.display = 'block';
    messageDiv.className = 'alert alert-success';
    messageDiv.textContent = 'Logged in successfully!';
    setTimeout(() => window.location.href = 'index.html', 1000);
  } else {
    messageDiv.style.display = 'block';
    messageDiv.className = 'alert alert-danger';
    messageDiv.innerHTML = 'Invalid credentials. Don\'t have an account? <a href="signup.html">Sign Up</a>';
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