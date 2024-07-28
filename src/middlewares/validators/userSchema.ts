import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';


export const createSchema =  validateRequest({
    body: z.object({
        name: z.string()
    })
})