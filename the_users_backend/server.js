const express = require('express');
const userRoutes = require('./userRoutes');
const cors = require('cors');
const app = express();

// app.use(cors());


app.use(cors({
  origin: 'https://64d5ff21a3736a46e03551eb--earnest-strudel-469a22.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'))

app.listen(3002, () => {
  console.log('Server running on port 3000');
});


