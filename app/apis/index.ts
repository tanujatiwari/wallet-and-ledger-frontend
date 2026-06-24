import axiosInstance from "./axiosInstance"
import { apis } from "./constants"

export const getUserProfile = async () => {
    const resp = await axiosInstance().get(apis.userProfile)
    return resp?.data
}