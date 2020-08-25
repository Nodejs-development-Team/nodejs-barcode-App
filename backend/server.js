const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());


// Connect the database
const database = process.env.ATLAS_URI;

mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(con => {
    console.log('DB connection Successfully!');
})
.catch((err)=>{
    console.warn(err)
})



//routes

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});