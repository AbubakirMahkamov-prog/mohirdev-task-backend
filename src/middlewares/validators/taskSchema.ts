import { validateRequest } from 'zod-express-middleware';
import { z } from 'zod';

export const taskCreateSchema =  validateRequest({
    body: z.object({
        title: z.string(),
        content: z.string()
    })
})


export const taskUpdateSchema =  validateRequest({
    params: z.object({
        id: z.string()
    }),
    body: z.object({
        title: z.string(),
        content: z.string()
    })
})

