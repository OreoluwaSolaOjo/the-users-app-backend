
import express, { Router, Request, Response } from 'express';
import { db, auth as adminAuth } from '../firebaseConfig';
import { verifyUser, verifyAdmin } from '../Middleware/auth';
import fetch from 'node-fetch';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import UserController from '../Controllers/userController';

const router: Router = express.Router();



router.post('/submit-data', verifyUser, UserController.submitData);

router.post('/login', verifyUser, UserController.login);


router.get('/retrieve-data/:userId', verifyUser, verifyAdmin, UserController.retrieveData);

router.get('/retrieve-single-data/:userId', verifyUser, UserController.retrieveSingleUser);

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


router.post('/set-admin',UserController.setAdminUser);

router.get('/retrieve-non-admin-users', verifyAdmin, UserController.retrieveNonAdminUsers);


router.post('/edit-user/:userId', verifyAdmin, upload.single('image'), UserController.editUser);

export default router;

