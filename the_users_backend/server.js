
const cors = require('cors');

const express = require('express');
const userRoutes = require('./userRoutes');

const app = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api/users', userRoutes);


app.listen(3002, () => {
  console.log('Server running on port 3000');
});


