import axiosInstance from "@/utils/axiosInstance";

export default async function fetchUser() {
    const response = await axiosInstance.get('/user/head');
    return response.data;
  };