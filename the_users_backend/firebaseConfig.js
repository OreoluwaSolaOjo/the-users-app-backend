const admin = require('firebase-admin');
const serviceAccount = require('./the-users-app-firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

// const uid = '9nxzCJRHYgPZlSnbXL6P9YBnfzF2';  // Replace this with the UID of the user you want to mark as an admin.
// admin.auth().setCustomUserClaims(uid, { admin: true })
//   .then(() => {
//     console.log('User is now an admin');
//   })
//   .catch(error => {
//     console.error('Error setting custom claims:', error);
//   });


module.exports = { auth, db };
