
import { comparePassword } from "@/lib/bcrypt";
import App from "../../app";

import { prismaMock } from "@/test/prisma"
import request from 'supertest' //supertest untuk mengexecute end point yang sudah dibuat (describe)

const requestBody = {
    email: 'user@mail.com',
    password: 'SecurePassword!'
}

jest.mock('@/lib/bcrypt', () => ({
    comparePassword: jest.fn().mockResolvedValue(true)
}))

//extension jest runner untuk menjalankan salah satu jest test
describe("POST /auth/login", () => {
    const { app } = new App()
    it("should login successfully", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce({
            id: 1,
            fullName: "mock fullname",
            email: 'mock email',
            password: "mock password",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        //diberik data supaya tidak masuk ke if !user

        const response = await request(app).post('/api/auth/login').send(requestBody)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('login success')
        expect(response.body.data).toBeDefined()
        expect(response.body.token).toBeDefined()
        // Kalau experct success register, maka statusnya harus 200

    })
    it("should return error if email not found", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce(null);


        const response = await request(app).post('/api/auth/login').send(requestBody)

        expect(response.status).toBe(500)
        expect(response.text).toBe('Invalid email address')

        // Kalau experct success register, maka statusnya harus 200

    })
    it("should return error if password not match", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce({
            id: 1,
            fullName: "mock fullname",
            email: 'mock email',
            password: "mock password",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        (comparePassword as jest.Mock).mockResolvedValueOnce(false)


        const response = await request(app).post('/api/auth/login').send(requestBody)

        expect(response.status).toBe(500)
        expect(response.text).toBe('Invalid Password')

        // Kalau experct success register, maka statusnya harus 200

    })
    // it("should return error if email already exist", async () => {
    //     prismaMock.user.findFirst.mockResolvedValueOnce({
    //         id: 1,
    //         fullName: "mock fullname",
    //         email: 'mock email',
    //         password: "mock password",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //     });
    //     const response = await request(app).post('/api/auth/register').send(requestBody)

    //     expect(response.status).toBe(500)
    //     expect(response.text).toBe('email already exist')

    // })
})

// Tujuan dilakukannya testing adalah untuk ngetes flow dari codingan yang telah kita buat. dan juga jika terjadi perubahan, misalnya dalam sebuah anggota tim yang tidak sengaja mengubah codingan kita, maka dengan unit testing ini akan menampilkan error dimana codingan tidak sesuai dengan expect yang ditentukan. 