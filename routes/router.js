// const db = require('../connections/db');
// const userSchema = require('../connections/schema')

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello Team-mates")
})



module.exports = router