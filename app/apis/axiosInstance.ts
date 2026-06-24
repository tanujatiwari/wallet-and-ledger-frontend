import axios from "axios"
import { getCookie } from "../utils/cookies"

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    instance.interceptors.request.use((config) => {
        const token = getCookie("token")
        if (token && token.accessToken) {
            config.headers.Authorization = `Bearer ${token.accessToken}`
        }
        return config
    })

    return instance
}

export default axiosInstance