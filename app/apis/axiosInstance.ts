import axios from "axios"
import { getCookie } from "../utils/cookies"

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    instance.interceptors.request.use((config) => {
        const token = getCookie("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    return instance
}

export default axiosInstance