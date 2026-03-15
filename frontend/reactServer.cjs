// ########################################
// ########## SETUP

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = 33022;

// ########################################
// ########## ROUTE HANDLERS

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// ########################################
// ########## LISTENER

app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});

//Citation
//Date:2/11/26
//Based on:
// https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419