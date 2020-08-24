// Code Starts here
const express = require('express')
const app = express()
const router = require('./routes/router');
app.get('/',router)
app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000')
})