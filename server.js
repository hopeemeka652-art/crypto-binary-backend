const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Basic login simulation — replace with real DB/KYC later
  if (email && password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get('/api/price', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    res.json({ price: data.ethereum.usd });
  } catch (err) {
    res.status(500).json({ error: 'Price fetch failed' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
