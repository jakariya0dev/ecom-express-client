import api from "@/lib/api/api";

export const loginUser = async (FormData) => {
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, FormData);
    return res.data;
}

export const registerUser = async (FormData) => {
    const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, FormData);
    return res.data;
}