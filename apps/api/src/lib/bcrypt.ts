import * as bcrypt from 'bcrypt'

export const comparePassword = async (
    candidatePassword: string,
    hashedPassword: string,
): Promise<boolean> => {
    return await bcrypt.compare(candidatePassword, hashedPassword)
}

export const hashpassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}