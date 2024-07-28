import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const loginSchema =  validateRequest({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
})

