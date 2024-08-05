import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const loginSchema =  validateRequest({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
})

export const registrationSchema =  validateRequest({
    body: z.object({
        fullname: z.string(),
        email: z.string().email(),
        password: z.string()
    })
})
