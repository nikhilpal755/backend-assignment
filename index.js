const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 5000;

// ----------- Middlewares ------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'))

// ----------- MongoDB ------------
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


// ----------- Routes ------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/session', require('./routes/session'));


// ----------- Server ------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})