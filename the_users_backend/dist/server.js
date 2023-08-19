"use strict";
// const cors = require('cors');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api/users', userRoutes_1.default);
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
