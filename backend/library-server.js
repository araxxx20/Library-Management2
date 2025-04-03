require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./route'); 
const finesRoutes = require('./route') 

// Init app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
});

// Database connection
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database`);
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.error("Database connection error:", error);
    });

// Routes
app.use('/books', booksRoutes);
app.use('/students', finesRoutes); 
