const express = require('express')
const app = express()
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); 

app.use(cors());
app.use(express.json()); 


app.post('/ai', async (req, res) => {
  const { explanation } = req.body;

  // check if 
  if (!explanation) return res.status(400).json({ error: "No explanation available" });

  try {
    // use gemini api
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Please summarize the following NASA explanation less than  20 words:\n\n${explanation}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const summary = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!summary) throw new Error('No response available');
    res.json({ summary });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'AI failed to summarize' });
  }
});




// get apod api
app.get('/apod', async (req, res) => {
  try {
    const { date } = req.query;  

    let nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    if (date) {
      nasaUrl += `&date=${date}`;
    }

    const response = await axios.get(nasaUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch apod from NASA API:', error.message);
    res.status(500).json({ error: 'Failed to fetch apod from NASA API' });
  }
})

/*

// for future use - mars photos api
app.get('/mars', async (req, res) => {
try {
  const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&api_key=${process.env.NASA_API_KEY}`)
  res.json(response.data);
}catch (error) {
    console.error('Failed to fetch mars photos from NASA API:', error.message);
    res.status(500).json({ error: 'Failed to fetch mars photos from NASA API' });
  }
})
  */

const PORT = 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app; 