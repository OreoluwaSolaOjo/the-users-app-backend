import express, { Router, Request, Response } from 'express';
import { db, auth as adminAuth } from '../firebaseConfig';
import { Storage } from '@google-cloud/storage';
import { SetAdminUserSchema, SubmitDataSchema, EditUserSchema } from '../Validation/validation';

const storage = new Storage({
    projectId: 'the-users-app',
    keyFilename: './the-users-app-firebase.json'
  });
  const bucket = storage.bucket('the-users-app.appspot.com/');
  



class UserController {

    async submitData(req: Request, res: Response) {

      const validation = SubmitDataSchema.safeParse(req.body);
  
      if (!validation.success) {
        return res.status(400).send({ message: `Invalid input: ${validation.error.message}` });
      }

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
            await db.collection('users').doc(req.user.uid).set(userData);
            res.send({ success: 'Data saved successfully' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).send({ message: 'Failed to save data' });
        }
    }

    login(req: Request, res: Response) {
        return res.status(200).send({ message: 'Token verified successfully.' });
    }
    async retrieveData(req: Request, res: Response) {
        const doc = await db.collection('users').doc(req.params.userId).get();
        if (!doc.exists) {
            res.status(404).send({message:'No user data found'});
        } else {
            res.send(doc.data());
        }
    }
    async retrieveSingleUser(req: Request, res: Response) {
      const doc = await db.collection('users').doc(req.params.userId).get();
        if (!doc.exists) {
            res.status(404).send({message:'No user data found'});
        } else {
            res.send({ message: "User Found Successfully", data: doc.data() });
        }

    }

    async setAdminUser(req:Request, res:Response){
      const validation = SetAdminUserSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).send({ message: `Invalid input: ${validation.error.message}` });
      }


        const uid = req.body.uid;
        adminAuth.setCustomUserClaims(uid, { admin: true })
          .then(() => {
            db.collection('users').doc(uid).set({ role: 'admin' }, { merge: true });
            res.send({ message: 'User is now an admin' });
          })
          .catch(error => {
            console.error('Error setting custom claims:', error);
            res.status(500).send({message:'Error setting user as admin'});
          });
    }
    async retrieveNonAdminUsers(req:Request, res:Response){
        try {
            const snapshot = await db.collection('users').where('role', '!=', 'admin').get();
            if (snapshot.empty) {
              return res.status(404).send({ message: 'No non-admin users found' });
            }
        
            let users: any[] = [];
            snapshot.forEach(doc => {
              users.push({ id: doc.id, ...doc.data() });
            });
        
            res.status(200).send({ message: 'Success', data: users });
          } catch (error) {
            console.error("Error retrieving non-admin users:", error);
            res.status(500).send({message:'Error retrieving non-admin users'});
          }
    }
    async editUser(req:Request, res:Response){
      const validation = EditUserSchema.safeParse(req.params);

      if (!validation.success) {
        return res.status(400).send({ message: `Invalid input: ${validation.error.message}` });
      }
      
      
        try {
            const userIdToEdit = req.params.userId;
        
            if (!req.file) {
              return res.status(400).send({ message: 'No image provided.' });
            }
        
            const blob = bucket.file(`user_images/${req.file.originalname}`);
            const blobStream = blob.createWriteStream();
        
            blobStream.on('error', (err) => {
              console.error('Error uploading file:', err);
              res.status(500).send({ message: 'Error uploading file' });
            });
        
            blobStream.on('finish', async () => {
              const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(blob.name)}?alt=media`;
        
              const response = await fetch(publicUrl);
              if (response.status !== 200) {
                return res.status(500).send({ message: 'Generated image URL is not accessible' });
              }
        
              await db.collection('users').doc(userIdToEdit).update({ image: publicUrl });
              res.send({ message: 'User updated successfully', imageUrl: publicUrl });
            });
        
            blobStream.end(req.file.buffer);
        
          } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).send({ message: 'Internal Server Error' });
          }
    }
}

export default new UserController();