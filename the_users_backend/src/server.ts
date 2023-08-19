
// const cors = require('cors');

// const express = require('express');
// const userRoutes = require('./Routes/userRoutes');

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use('/uploads', express.static('uploads'))
// app.use('/api/users', userRoutes);


// app.listen(3002, () => {
//   console.log('Server running on port 3000');
// });

import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';


import userRoutes from './Routes/userRoutes';

const app: Express = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

