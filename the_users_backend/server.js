const express = require('express');
const userRoutes = require('./userRoutes');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: 'https://64d5dd4dc55b45363f28912e--earnest-strudel-469a22.netlify.app'
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'))

app.listen(3002, () => {
  console.log('Server running on port 3000');
});


