# BoardMate

A full-stack web application for room rental listings, built with Node.js, Express, MySQL, and vanilla JS + Bootstrap 5.

## Features
- User registration/login with JWT.
- Create, view, edit, delete listings.
- Search listings by title/location/type.
- Rate listings with stars.
- Map integration with Leaflet.
- Responsive design with Bootstrap 5.

## Setup
1. Clone the repo.
2. Set up MySQL database and update `.env`.
3. Run `npm run install-all` in root, then `cd backend && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`.
4. Start backend: `cd backend && npm run dev`. Frontend: Open `frontend/index.html` in browser.

## Deployment
- Backend: Deploy to Railway/Render/Heroku (supports Node.js and MySQL).
- Frontend: Upload static files to xo.je (InfinityFree hosting) via FTP.
- Update API_BASE in frontend JS files to live backend URL.
- For xo.je, use FileZilla to upload frontend files to public_html folder.
- Set up MySQL database on InfinityFree and update DATABASE_URL in .env.