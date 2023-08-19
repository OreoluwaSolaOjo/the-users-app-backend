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
  
  });
  const EditUserSchema = z.object({
    userId: z.string(),
  });

  export {SetAdminUserSchema, SubmitDataSchema, EditUserSchema}