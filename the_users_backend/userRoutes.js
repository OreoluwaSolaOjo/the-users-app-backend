const express = require('express');
const router = express.Router();
const { db } = require('./firebaseConfig');
const adminAuth = require('./firebaseConfig').auth;
const { verifyUser, verifyAdmin } = require('./middlewares');

// router.post('/submit-data', verifyUser, async (req, res) => {
//   //... same as before
//   const userData = {
//     companyName: req.body.companyName,
//     numOfUsers: req.body.numOfUsers,
//     numOfProducts: req.body.numOfProducts,
//     percentage: req.body.percentage,
//   };

//   await db.collection('users').doc(req.user.uid).set(userData);
//   res.send({success: 'Data saved successfully'});
// });
router.post('/submit-data', verifyUser, async (req, res) => {
  const userData = {
    role: "user",
    companyName: req.body.companyName,
    numOfUsers: req.body.numOfUsers,
    numOfProducts: req.body.numOfProducts,
    percentage: req.body.percentage,
    email: req.body.email,
  };

  try {
    await db.collection('users').doc(req.user.uid).set(userData);
    res.send({ success: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send({ error: 'Failed to save data' });
  }
});



router.post('/login', verifyUser, (req, res) => {
  // At this point, the token is already verified by the middleware.
  return res.status(200).send({ message: 'Token verified successfully.' });
});
router.get('/retrieve-data/:userId', verifyUser, verifyAdmin, async (req, res) => {
  //... same as before
  const doc = await db.collection('users').doc(req.params.userId).get();
  if (!doc.exists) {
    res.status(404).send('No user data found');
  } else {
    res.send(doc.data());
  }
});


const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure as needed

// router.post('/edit-user/:userId', verifyAdmin, upload.single('image'), async (req, res) => {
//     try {
//         const userIdToEdit = req.params.userId;

//         // Assuming you're sending the image as a file with the field name 'image'.
//         // The file's path will be in req.file.path.
//         if (!req.file) {
//             return res.status(400).send({ error: 'No image provided.' });
//         }

//         const imagePath = req.file.path;

//         // Ideally, you'd want to upload this image to a storage solution (like Firebase Cloud Storage)
//         // and then save the URL to Firestore. For now, let's just save the local path:
//         await db.collection('users').doc(userIdToEdit).update({ image: imagePath });

//         res.send({ success: 'User updated successfully' });
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// });
router.post('/edit-user/:userId', verifyAdmin, (req, res, next) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).send({ error: 'Multer error: ' + err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).send({ error: 'Upload error' });
    }

    // Everything went fine; proceed to next middleware.
    next();
  });
}, async (req, res) => {
  // ... rest of your endpoint logic ...
    try {
        const userIdToEdit = req.params.userId;

        // Assuming you're sending the image as a file with the field name 'image'.
        // The file's path will be in req.file.path.
        if (!req.file) {
            return res.status(400).send({ error: 'No image provided.' });
        }

        const imagePath = req.file.path;

        // Ideally, you'd want to upload this image to a storage solution (like Firebase Cloud Storage)
        // and then save the URL to Firestore. For now, let's just save the local path:
        await db.collection('users').doc(userIdToEdit).update({ image: imagePath });

        res.send({ success: 'User updated successfully' });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.post('/set-admin', (req, res) => {
  const uid = req.body.uid;
  adminAuth.setCustomUserClaims(uid, { admin: true })
    .then(() => {
      db.collection('users').doc(uid).set({ role: 'admin' }, { merge: true });
      res.send({ success: 'User is now an admin' });
    })
    .catch(error => {
      console.error('Error setting custom claims:', error);
      res.status(500).send('Error setting user as admin');
    });
});

router.get('/retrieve-non-admin-users', verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('users').where('role', '!=', 'admin').get();
    // const snapshot = await db.collection('users').get();
    if (snapshot.empty) {
      return res.status(404).send({ message: 'No non-admin users found' });
    }

    let users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    // res.send(users);
    res.status(200).send({ message: 'Success', data: users });
  } catch (error) {
    console.error("Error retrieving non-admin users:", error);
    res.status(500).send('Error retrieving non-admin users');
  }
});

// ... other routes

module.exports = router;
