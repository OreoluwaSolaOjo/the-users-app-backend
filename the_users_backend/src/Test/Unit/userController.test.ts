import UserController from '../../Controllers/userController';
import { Request, Response } from 'express';

type DecodedUserToken = {
    uid: string;
    // ... any other properties that a DecodedUserToken might have
};

// Mocking Firebase and GCP calls here
jest.mock('../../firebaseConfig', () => {
    return {
        db: {
          collection: jest.fn(() => ({
            doc: jest.fn(() => ({
              get: jest.fn(),
              set: jest.fn(),
              update: jest.fn(),
            })),
            where: jest.fn(() => ({
              get: jest.fn(),
            })),
          })),
        },
        auth: {
          setCustomUserClaims: jest.fn(),
        },
      };
});

jest.mock('@google-cloud/storage', () => {
    return {
        Storage: jest.fn(() => ({
          bucket: jest.fn(() => ({
            file: jest.fn(() => ({
              createWriteStream: jest.fn(() => ({
                on: jest.fn(),
                end: jest.fn(),
              })),
            })),
          })),
        }),)
      };
});



describe('UserController', () => {

});




type MockResponse = Partial<Response> & {
    status: jest.Mock<any, any>;
    send: jest.Mock<any, any>;
};

describe('UserController', () => {
    describe('submitData', () => {
        it('should return 400 for invalid input', async () => {
            const req: Partial<Request> = {
                body: {}  // Sending an empty body
            };

            const res: MockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await UserController.submitData(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(400);
        });
        it('should return 401 if user is not authenticated', async () => {
            const req: Partial<Request> & { user?: DecodedUserToken | null } = {
                body: {
                    companyName: 'Test',
                    numOfUsers: 5,
                    numOfProducts: 5,
                    percentage: 70,
                    email: 'test@email.com'
                },
                // user: null  // Not authenticated
            };
        
            const res: MockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };
        
            await UserController.submitData(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(401);
        });
     
    });

  
});

