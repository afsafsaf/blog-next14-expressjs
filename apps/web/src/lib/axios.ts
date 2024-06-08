import { appconfig } from "@/utils/config"
import axios, { AxiosInstance } from "axios"

const { baseUrl } = appconfig
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
})
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)