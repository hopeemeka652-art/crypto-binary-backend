const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy login endpoint (for frontend testing)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Simple login logic (replace with database later)
  if (email && password) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Missing credentials' });
  }
});

// ETH/USDT price fetch endpoint
app.get('/api/price', async (req, res) => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    res.json({ price: data.ethereum.usd });
  } catch (err) {
    console.error('Price fetch error:', err.message);
    res.status(500).json({ error: 'Price fetch failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
