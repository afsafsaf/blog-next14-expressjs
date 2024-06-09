import { hashpassword } from "@/lib/bcrypt"
import prisma from "@/prisma"
import { User } from "@prisma/client"

export const registerService = async (body: Pick<User, 'fullName' | 'email' | 'password'>) => {
    try {

        const { email, password } = body
        const existingUser = await prisma.user.findFirst({
            where: { email }
        })

        if (existingUser) {
            throw new Error('email already exist')
        }

        const hashedPassword = await hashpassword(password)

        const user = await prisma.user.create({
            data: { ...body, password: hashedPassword }
        })
        return {
            message: 'success',
            data: user
        }
    } catch (error) {
        throw error
    }
}