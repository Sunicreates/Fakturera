require('dotenv').config();
const express = require('express');
const cors = require('cors');
const navbarRoutes = require('./routes/navbar');
const homeRoutes = require('./routes/home');

const app = express();
app.use(cors());
app.use(express.json());
app.use(navbarRoutes);
app.use(homeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});