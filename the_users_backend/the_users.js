// // const admin = require('firebase-admin');

// // const serviceAccount = require('./the-users-app-firebase.json');

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });

// // const auth = admin.auth();

// // const express = require('express');
// // const app = express();

// // app.listen(3000, () => {
// //   console.log('Server running on port 3000');
// // });



// // async function verifyUser(req, res, next) {
// //     const token = req.headers.authorization;
// //     try {
// //       const decodedToken = await auth.verifyIdToken(token);
// //       req.user = decodedToken;
// //       next();
// //     } catch (error) {
// //       res.status(403).send('Unauthorized');
// //     }
// //   }

// //   const db = admin.firestore();

// // app.post('/submit-data', verifyUser, async (req, res) => {
// //   const userData = {
// //     companyName: req.body.companyName,
// //     numOfUsers: req.body.numOfUsers,
// //     numOfProducts: req.body.numOfProducts,
// //     percentage: req.body.percentage,
// //   };

// //   await db.collection('users').doc(req.user.uid).set(userData);
// //   res.send('Data saved successfully');
// // });

// // app.get('/retrieve-data/:userId', verifyUser, async (req, res) => {
// //   const doc = await db.collection('users').doc(req.params.userId).get();
// //   if (!doc.exists) {
// //     res.status(404).send('No user data found');
// //   } else {
// //     res.send(doc.data());
// //   }
// // });

// // // ... Additional routes for other CRUD operations.

  

// // image storage
// const { Storage } = require('@google-cloud/storage');

// const storage = new Storage({
//   projectId: 'the-users-app',
//   keyFilename: './the-users-app-firebase.json'
// });

// const bucket = storage.bucket('gs://the-users-app.appspot.com/');



// const multer = require('multer');

// const uploader = multer({
//   storage: multer.memoryStorage(), // Store the file in memory
//   limits: {
//     fileSize: 5 * 1024 * 1024 // Maximum file size in bytes (e.g., 5 MB here)
//   }

// });


// app.post('/upload', verifyAdmin, uploader.single('image'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }
  
//     const blob = bucket.file(req.file.originalname);
//     const blobStream = blob.createWriteStream();
  
//     blobStream.on('error', (err) => {
//       return res.status(500).send(err);
//     });
  
//     blobStream.on('finish', () => {
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//       res.status(200).send(publicUrl);  // This URL can be stored in Firestore alongside other user data.
//     });
  
//     blobStream.end(req.file.buffer);
//   });

  
// //   rules_version = '2';

// // service firebase.storage {
// //   match /b/{bucket}/o {
// //     match /{allPaths=**} {
// //       allow read, write: if false;
// //     }
// //   }

// // }


