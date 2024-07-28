import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';


export const createSchema =  validateRequest({
    body: z.object({
        fullname: z.string(),
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['user', 'admin']).optional()
    })
})