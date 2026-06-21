const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

db.query('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err.message));
const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Crown Stores System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 