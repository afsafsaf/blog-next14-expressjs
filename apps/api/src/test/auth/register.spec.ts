import App from "../../app";

import { prismaMock } from "@/test/prisma"
import request from 'supertest' //supertest untuk mengexecute end point yang sudah dibuat (describe)

const requestBody = {
    fullName: 'fullPower',
    email: 'user@mail.com',
    password: 'SecurePassword!'
}
describe("POST /auth/register", () => {
    const { app } = new App()
    it("should register user successfully", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce(null); //datanya diberi null supaya tidak masuk ke if existingEmail
        prismaMock.user.create.mockResolvedValueOnce({
            id: 1,
            fullName: "mock fullname",
            email: 'mock email',
            password: "mock password",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const response = await request(app).post('/api/auth/register').send(requestBody)

        // console.log(response.body);

        expect(response.status).toBe(200)
        // Kalau experct success register, maka statusnya harus 200

    })
    it("should return error if email already exist", async () => {
        prismaMock.user.findFirst.mockResolvedValueOnce({
            id: 1,
            fullName: "mock fullname",
            email: 'mock email',
            password: "mock password",
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const response = await request(app).post('/api/auth/register').send(requestBody)

        expect(response.status).toBe(500)
        expect(response.text).toBe('email already exist')

    })
})

// Tujuan dilakukannya testing adalah untuk ngetes flow dari codingan yang telah kita buat. dan juga jika terjadi perubahan, misalnya dalam sebuah anggota tim yang tidak sengaja mengubah codingan kita, maka dengan unit testing ini akan menampilkan error dimana codingan tidak sesuai dengan expect yang ditentukan. 