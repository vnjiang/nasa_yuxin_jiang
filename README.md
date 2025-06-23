
Live Demo: https://nasa-yuxin-jiang.vercel.app/
if you have any question, feel free to contact jiangyuxin0326@gmail.com，always Welcome to discuss more！

## Project Overview
This project is a daily astronomy photo/video explorer built with NASA's Open API, featuring immersive sci-fi UI, simple animations, and AI-powered summary to help users quickly understand astronomical content.
The app uses a modern React frontend and a Node.js/Express backend to fetch, process, and visualize NASA data.

## Key Features
- Browse NASA's Astronomy Picture/Video of the Day (APOD) with creative, immersive Sci-fi UI and animations
- interactive operation about apod content, background music, and custom date selection, with optimized responsive design
- "AI Summary" button powered by Google Gemini for concise explanation



## Installation and Local Development
1. Clone the repo
git clone https://github.com/vnjiang/nasa_yuxin_jiang.git
cd nasa_yuxin_jiang


2. Get your API keys 
Nasa：https://api.nasa.gov/
Gemini：https://aistudio.google.com/apikey

3. Modify .env file in the backend/ directory:
replace your_API_key with your own key

4. Install dependencies
cd backend
npm install

cd ../frontend
npm install

5. Run locally
cd frontend 
npm start 

cd backend 
node index.js



## Deployment
Frontend is deployed to Vercel at:
https://nasa-yuxin-jiang.vercel.app/

Backend is deployed to Render at:
https://nasa-yuxin-jiang.onrender.com/


## Technologies Used
1. Frontend
React (Hooks)
Tailwind CSS
Framer Motion
Axios

2. Backend
Node.js
Express
Axios
dotenv
CORS

3. Testing
Jest + Supertest

4. Third-party API
NASA APOD API
Google Gemini API



## Testing
Backend tests
cd backend
npm test

Frontend tests
cd ../frontend
npm test
a


