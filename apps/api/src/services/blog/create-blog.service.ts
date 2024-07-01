import prisma from "@/prisma"
import { Blog } from "@prisma/client"


interface CreateBlogBody extends Omit<Blog, 'id' | 'deletedAt' | 'updatedAt' | 'thumbnail'> { }

export const createBlogService = async (body: CreateBlogBody, file: Express.Multer.File) => {
    try {
        const { title, userId } = body
        const existingTitle = await prisma.blog.findFirst({
            where: { title: title }
        })

        if (existingTitle) {
            throw new Error('title already exist')
        }

        const user = await prisma.user.findFirst({
            where: { id: Number(userId) }
        })

        if (!user) {
            throw new Error('user not found')
        }

        return await prisma.blog.create({
            data: {
                ...body, thumbnail: `/images/${file.filename}`, userId: Number(userId)
            }
        })

    } catch (error) {
        throw error
    }
}