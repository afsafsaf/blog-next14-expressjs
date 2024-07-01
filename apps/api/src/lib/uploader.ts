
import { NextFunction, Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join } from 'path'
type DestinationCallback = (error: Error | null, destination: string) => void
type FilenameCallback = (error: Error | null, destination: string) => void

export const uploader = (
    filePrefix: string,
    folderName?: string,
    fileLimit?: number
) => {
    const defaultDir = join(__dirname, '../../public')

    const storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
            const destination = folderName ? defaultDir + folderName : defaultDir
            cb(null, destination)
        },
        filename: (req: Request, file: Express.Multer.File, cb: FilenameCallback) => {
            const originalnameParts = file.originalname.split('.')
            const fileExtension = originalnameParts[originalnameParts.length - 1]
            const newFileName = filePrefix + Date.now() + '.' + fileExtension

            cb(null, newFileName)
        }
    })

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const extAllowed = /\.(jpg|jpeg|png|webp|avif)$/
        const isExtMatch = file.originalname.toLowerCase().match(extAllowed)

        if (isExtMatch) {
            cb(null, true)
        } else {
            const error = new Error('your file extension is denied')
            cb(null, false)
            cb(error)
        }
    }

    const limits = { fileSize: fileLimit || 2 * 1024 * 1024 } //default 2MB

    return multer({ storage, fileFilter, limits })
}