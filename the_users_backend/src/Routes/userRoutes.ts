// const express = require('express');
// const router = express.Router();
// const { db } = require('../firebaseConfig');
// const adminAuth = require('../firebaseConfig').auth;
// const { verifyUser, verifyAdmin } = require('../Middleware/middlewares');
// const fetch = require('node-fetch');

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

import express, { Router, Request, Response } from 'express';
import { db, auth as adminAuth } from '../firebaseConfig';
import { verifyUser, verifyAdmin } from '../Middleware/auth';
import fetch from 'node-fetch';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import UserController from '../Controllers/userController';

const router: Router = express.Router();



// router.post('/submit-data', verifyUser, async (req: Request, res: Response) => {
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
//     if (!req.user) {
//       return res.status(401).send({ message: 'User is not authenticated.' });
//   }
//     await db.collection('users').doc(req.user.uid).set(userData);
//     res.send({ success: 'Data saved successfully' });
//   } catch (error) {
//     console.error('Error saving data:', error);
//     res.status(500).send({ error: 'Failed to save data' });
//   }
// });
router.post('/submit-data', verifyUser, UserController.submitData);
// router.post('/login', verifyUser, (req: Request, res: Response) => {
//   return res.status(200).send({ message: 'Token verified successfully.' });
// });
router.post('/login', verifyUser, UserController.login);

// router.get('/retrieve-data/:userId', verifyUser, verifyAdmin, async (req: Request, res: Response) => {
//   const doc = await db.collection('users').doc(req.params.userId).get();
//   if (!doc.exists) {
//     res.status(404).send('No user data found');
//   } else {
//     res.send(doc.data());
//   }
// });
router.get('/retrieve-data/:userId', verifyUser, verifyAdmin, UserController.retrieveData);
// router.get('/retrieve-single-data/:userId', verifyUser, async (req: Request, res: Response) => {
//   const doc = await db.collection('users').doc(req.params.userId).get();
//   if (!doc.exists) {
//     res.status(404).send('No user data found');
//   } else {
//     res.send({ message: "User Found Successfully", data: doc.data() });
//   }
// });
router.get('/retrieve-single-data/:userId', verifyUser, UserController.retrieveSingleUser);

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// router.post('/set-admin', (req: Request, res: Response) => {
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
router.post('/set-admin',UserController.setAdminUser);
// router.get('/retrieve-non-admin-users', verifyAdmin, async (req: Request, res: Response) => {
//   try {
//     const snapshot = await db.collection('users').where('role', '!=', 'admin').get();
//     if (snapshot.empty) {
//       return res.status(404).send({ message: 'No non-admin users found' });
//     }

//     let users: any[] = [];
//     snapshot.forEach(doc => {
//       users.push({ id: doc.id, ...doc.data() });
//     });

//     res.status(200).send({ message: 'Success', data: users });
//   } catch (error) {
//     console.error("Error retrieving non-admin users:", error);
//     res.status(500).send('Error retrieving non-admin users');
//   }
// });
router.get('/retrieve-non-admin-users', verifyAdmin, UserController.retrieveNonAdminUsers);
// const storage = new Storage({
//   projectId: 'the-users-app',
//   keyFilename: './the-users-app-firebase.json'
// });
// const bucket = storage.bucket('the-users-app.appspot.com/');

// router.post('/edit-user/:userId', verifyAdmin, upload.single('image'), async (req: Request, res: Response) => {
//   try {
//     const userIdToEdit = req.params.userId;

//     if (!req.file) {
//       return res.status(400).send({ error: 'No image provided.' });
//     }

//     const blob = bucket.file(`user_images/${req.file.originalname}`);
//     const blobStream = blob.createWriteStream();

//     blobStream.on('error', (err) => {
//       console.error('Error uploading file:', err);
//       res.status(500).send({ error: 'Error uploading file' });
//     });

//     blobStream.on('finish', async () => {
//       const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(blob.name)}?alt=media`;

//       const response = await fetch(publicUrl);
//       if (response.status !== 200) {
//         return res.status(500).send({ error: 'Generated image URL is not accessible' });
//       }

//       await db.collection('users').doc(userIdToEdit).update({ image: publicUrl });
//       res.send({ success: 'User updated successfully', imageUrl: publicUrl });
//     });

//     blobStream.end(req.file.buffer);

//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// });

router.post('/edit-user/:userId', verifyAdmin, upload.single('image'), UserController.editUser);

export default router;

