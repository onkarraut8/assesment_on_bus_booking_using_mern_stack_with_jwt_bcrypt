require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Import routers
const  bookRouter = require('./routers/bookRouter');
const userRouter  = require('./routers/userRouter');
const adminRouter  = require('./routers/adminRouter');
const busRouter  = require('./routers/busRouter');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



// Use routers
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/bus', busRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
