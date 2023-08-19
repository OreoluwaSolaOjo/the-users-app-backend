"use strict";
// const express = require('express');
// const router = express.Router();
// const { db } = require('../firebaseConfig');
// const adminAuth = require('../firebaseConfig').auth;
// const { verifyUser, verifyAdmin } = require('../Middleware/middlewares');
// const fetch = require('node-fetch');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post('/submit-data', verifyUser, async (req, res) => {
//   const userData = {
//     role: "user",
//     companyName: req.body.companyName,
//     numOfUsers: req.body.numOfUsers,
//     numOfProducts: req.body.numOfProducts,
//     percentage: req.body.percentage,
//     email: req.body.email,
//     // image: req.body.image
//   };
//   try {
//     await db.collection('users').doc(req.user.uid).set(userData);
//     res.send({ success: 'Data saved successfully' });
//   } catch (error) {
//     console.error('Error saving data:', error);
//     res.status(500).send({ error: 'Failed to save data' });
//   }
// });
// router.post('/login', verifyUser, (req, res) => {
//   // At this point, the token is already verified by the middleware.
//   return res.status(200).send({ message: 'Token verified successfully.' });
// });
// router.get('/retrieve-data/:userId', verifyUser, verifyAdmin, async (req, res) => {
//   const doc = await db.collection('users').doc(req.params.userId).get();
//   if (!doc.exists) {
//     res.status(404).send('No user data found');
//   } else {
//     res.send(doc.data());
//   }
// });
// router.get('/retrieve-single-data/:userId', verifyUser, async (req, res) => {
//   const doc = await db.collection('users').doc(req.params.userId).get();
//   if (!doc.exists) {
//     res.status(404).send('No user data found');
//   } else {
//     res.send({message: "User Found Successfully", data: doc.data()});
//   }
// });
// const multer = require('multer');
// const multerStorage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage: multerStorage }); // Use the in-memory storage
// router.post('/set-admin', (req, res) => {
//   const uid = req.body.uid;
//   adminAuth.setCustomUserClaims(uid, { admin: true })
//     .then(() => {
//       db.collection('users').doc(uid).set({ role: 'admin' }, { merge: true });
//       res.send({ success: 'User is now an admin' });
//     })
//     .catch(error => {
//       console.error('Error setting custom claims:', error);
//       res.status(500).send('Error setting user as admin');
//     });
// });
// router.get('/retrieve-non-admin-users', verifyAdmin, async (req, res) => {
//   try {
//     const snapshot = await db.collection('users').where('role', '!=', 'admin').get();
//     // const snapshot = await db.collection('users').get();
//     if (snapshot.empty) {
//       return res.status(404).send({ message: 'No non-admin users found' });
//     }
//     let users = [];
//     snapshot.forEach(doc => {
//       users.push({ id: doc.id, ...doc.data() });
//     });
//     // res.send(users);
//     res.status(200).send({ message: 'Success', data: users });
//   } catch (error) {
//     console.error("Error retrieving non-admin users:", error);
//     res.status(500).send('Error retrieving non-admin users');
//   }
// });
// const { Storage } = require('@google-cloud/storage');
// const storage = new Storage({
//   projectId: 'the-users-app',
//   keyFilename: './the-users-app-firebase.json'
// });
// const bucket = storage.bucket('the-users-app.appspot.com/');
// router.post('/edit-user/:userId', verifyAdmin, upload.single('image'), async (req, res) => {
//   try {
//     const userIdToEdit = req.params.userId;
//     if (!req.file) {
//       return res.status(400).send({ error: 'No image provided.' });
//     }
//     // Upload the image to Firebase Cloud Storage
//     const blob = bucket.file(`user_images/${req.file.originalname}`);
//     const blobStream = blob.createWriteStream();
//     blobStream.on('error', (err) => {
//       console.error('Error uploading file:', err);
//       res.status(500).send({ error: 'Error uploading file' });
//     });
//     // blobStream.on('finish', async () => {
//     //   // The file upload is complete.
//     //   const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
//     //   // Update the user document with the image URL
//     //   await db.collection('users').doc(userIdToEdit).update({ image: publicUrl });
//     //   res.send({ success: 'User updated successfully', imageUrl: publicUrl });
//     // });
//     // ... your code ...
//     blobStream.on('finish', async () => {
//       //  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
//       const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(blob.name)}?alt=media`;
//        // Check if the URL is accessible
//        const response = await fetch(publicUrl);
//        console.log("this is response", response)
//        if (response.status !== 200) {
//           return res.status(500).send({ error: 'Generated image URL is not accessible' });
//        }
//        await db.collection('users').doc(userIdToEdit).update({ image: publicUrl });
//        res.send({ success: 'User updated successfully', imageUrl: publicUrl });
//     });
//     blobStream.end(req.file.buffer);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });
// module.exports = router;
const express_1 = __importDefault(require("express"));
const firebaseConfig_1 = require("../firebaseConfig");
const middlewares_1 = require("../Middleware/middlewares");
const node_fetch_1 = __importDefault(require("node-fetch"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("@google-cloud/storage");
const router = express_1.default.Router();
router.post('/submit-data', middlewares_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        role: "user",
        companyName: req.body.companyName,
        numOfUsers: req.body.numOfUsers,
        numOfProducts: req.body.numOfProducts,
        percentage: req.body.percentage,
        email: req.body.email,
        // image: req.body.image
    };
    try {
        if (!req.user) {
            return res.status(401).send({ message: 'User is not authenticated.' });
        }
        yield firebaseConfig_1.db.collection('users').doc(req.user.uid).set(userData);
        res.send({ success: 'Data saved successfully' });
    }
    catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send({ error: 'Failed to save data' });
    }
}));
router.post('/login', middlewares_1.verifyUser, (req, res) => {
    return res.status(200).send({ message: 'Token verified successfully.' });
});
router.get('/retrieve-data/:userId', middlewares_1.verifyUser, middlewares_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebaseConfig_1.db.collection('users').doc(req.params.userId).get();
    if (!doc.exists) {
        res.status(404).send('No user data found');
    }
    else {
        res.send(doc.data());
    }
}));
router.get('/retrieve-single-data/:userId', middlewares_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebaseConfig_1.db.collection('users').doc(req.params.userId).get();
    if (!doc.exists) {
        res.status(404).send('No user data found');
    }
    else {
        res.send({ message: "User Found Successfully", data: doc.data() });
    }
}));
const multerStorage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: multerStorage });
router.post('/set-admin', (req, res) => {
    const uid = req.body.uid;
    firebaseConfig_1.auth.setCustomUserClaims(uid, { admin: true })
        .then(() => {
        firebaseConfig_1.db.collection('users').doc(uid).set({ role: 'admin' }, { merge: true });
        res.send({ success: 'User is now an admin' });
    })
        .catch(error => {
        console.error('Error setting custom claims:', error);
        res.status(500).send('Error setting user as admin');
    });
});
router.get('/retrieve-non-admin-users', middlewares_1.verifyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firebaseConfig_1.db.collection('users').where('role', '!=', 'admin').get();
        if (snapshot.empty) {
            return res.status(404).send({ message: 'No non-admin users found' });
        }
        let users = [];
        snapshot.forEach(doc => {
            users.push(Object.assign({ id: doc.id }, doc.data()));
        });
        res.status(200).send({ message: 'Success', data: users });
    }
    catch (error) {
        console.error("Error retrieving non-admin users:", error);
        res.status(500).send('Error retrieving non-admin users');
    }
}));
const storage = new storage_1.Storage({
    projectId: 'the-users-app',
    keyFilename: './the-users-app-firebase.json'
});
const bucket = storage.bucket('the-users-app.appspot.com/');
router.post('/edit-user/:userId', middlewares_1.verifyAdmin, upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdToEdit = req.params.userId;
        if (!req.file) {
            return res.status(400).send({ error: 'No image provided.' });
        }
        const blob = bucket.file(`user_images/${req.file.originalname}`);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (err) => {
            console.error('Error uploading file:', err);
            res.status(500).send({ error: 'Error uploading file' });
        });
        blobStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(blob.name)}?alt=media`;
            const response = yield node_fetch_1.default(publicUrl);
            if (response.status !== 200) {
                return res.status(500).send({ error: 'Generated image URL is not accessible' });
            }
            yield firebaseConfig_1.db.collection('users').doc(userIdToEdit).update({ image: publicUrl });
            res.send({ success: 'User updated successfully', imageUrl: publicUrl });
        }));
        blobStream.end(req.file.buffer);
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
