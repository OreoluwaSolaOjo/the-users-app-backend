const express = require('express');
const userRoutes = require('./userRoutes');
const cors = require('cors');
const app = express();

// app.use(cors());


// app.use(cors({
 
//   origin: 'https://64d5ff21a3736a46e03551eb--earnest-strudel-469a22.netlify.app',
//   credentials: true
// }));
const allowedOrigins = [
  'https://64d5ff21a3736a46e03551eb--earnest-strudel-469a22.netlify.app',
  'https://64d5dcd0ff6c0b35036ba6ab--earnest-strudel-469a22.netlify.app',
  //... you can add other allowed URLs here
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/api/users', userRoutes);


app.listen(3002, () => {
  console.log('Server running on port 3000');
});


