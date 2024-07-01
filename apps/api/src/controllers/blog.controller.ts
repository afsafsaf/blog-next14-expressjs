import { NextFunction, Request, Response } from 'express';

import { createBlogService } from '@/services/blog/create-blog.service';
import { getBlogService } from '@/services/blog/get-blog.service';

export class BlogController {
    async CreateBlogController(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req.files as Express.Multer.File[]

            if (!files?.length) {
                throw new Error('no file uploaded')
            }
            const result = await createBlogService(req.body, files[0])

            return res.status(200).send(result)
        } catch (error) {
            next(error)
        }

    }
    async GetBlogController(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const result = await getBlogService(Number(id))
            return res.status(200).send(result)
        } catch (error) {
            next(error)
        }

    }


}
