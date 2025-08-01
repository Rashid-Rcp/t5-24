import axiosInstance from "@/utils/axiosInstance";

export default async function searchUsers(query: string) {
    const response = await axiosInstance.get(`/user/search?query=${query}`);
    return response.data; 
  };