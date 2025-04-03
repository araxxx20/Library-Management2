
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');


// Load fines data from JSON file
const finesDataPath = path.join(__dirname, '../data/fines.json');
let finesData = {};

try {
    finesData = JSON.parse(fs.readFileSync(finesDataPath, 'utf-8'));
} catch (error) {
    console.error('Error loading fines data:', error);
    finesData = {}; // Fallback if file is missing
}

// Controller function to get fines by student ID
const getFines = (req, res) => {
    const studentId = req.params.id;
    const fine = finesData[studentId];

    if (fine) {
        res.json(fine);
    } else {
        res.status(404).json({ error: "Student not found or no fines" });
    }
};

module.exports = { getFines };