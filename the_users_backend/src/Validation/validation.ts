import { z } from 'zod';

const SetAdminUserSchema = z.object({
    uid: z.string(), 
  });
  

  const SubmitDataSchema = z.object({
    companyName: z.string(),
    numOfUsers: z.number(),
    numOfProducts: z.number(),
    percentage: z.number(),
    email: z.string().email(),
    // Assuming image is optional or coming from another source
  });
  const EditUserSchema = z.object({
    userId: z.string(), // Assuming the user ID is a string.
  });

  export {SetAdminUserSchema, SubmitDataSchema, EditUserSchema}