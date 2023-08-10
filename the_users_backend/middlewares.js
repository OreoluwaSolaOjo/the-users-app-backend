const { auth } = require('./firebaseConfig');
const express = require('express');







// async function verifyUser(req, res, next) {
//   const token = req.headers.authorization;
//   try {
//     const decodedToken = await auth.verifyIdToken(token);
//     req.user = decodedToken;
//     res.status(200).send('Login Successful');
//     next();
//   } catch (error) {
//     res.status(403).send('Unauthorized');
//   }
// }
// Inside verifyUser middleware:

async function verifyUser(req, res, next) {
  const token = req.headers.authorization;
try {
  const decodedToken = await auth.verifyIdToken(token);
    // req.user = decodedToken;
    //  res.status(200).send('Login Successful');

  //   try {
  //     const decodedToken = await auth.verifyIdToken(token);
  //     req.user = decodedToken;
  //     res.status(200).send('Login Successful');
  if (decodedToken) {
    // Token is valid. Attach the decoded token or user data to the request for further processing, if needed.
    req.user = decodedToken;
    next(); // Continue to the next middleware or route handler.
  } else {
    return res.status(401).send({ message: 'Token verification failed.' });
  }
} catch (error) {
  console.error('Token verification error:', error);
  return res.status(500).send({ message: 'Internal server error during token verification.' });
}
}

async function verifyAdmin (req, res, next) {
  const token = req.headers.authorization;
  try {
    // const idToken = req.headers.authorization?.split('Bearer ')[1];
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    const decodedToken = await auth.verifyIdToken(token);
    if (decodedToken.admin) {  // Check the 'admin' claim.
      next();  // User is an admin; proceed to the route.
    } else {
      res.status(403).send('Access denied: You are not an admin');
    }
  } catch (error) {
    res.status(500).send('Error verifying token');
  }
};

module.exports = { verifyUser, verifyAdmin };