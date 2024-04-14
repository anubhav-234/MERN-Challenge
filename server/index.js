// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 9000;
const apiRoutes = require('./src/apiRoutes');
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
