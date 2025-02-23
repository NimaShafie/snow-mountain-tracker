require('dotenv').config();
const express = require('express');
const cors = require('cors');

const locationRoutes = require('./routes/location');
const weatherRoutes = require('./routes/weather');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/location', locationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send("Snow Mountain Tracker Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
