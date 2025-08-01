import axiosInstance from "@/utils/axiosInstance";

export default async function fetchDiscussion(slug: string) {

    const response = await axiosInstance.get(`/discussion/${slug}`);
    return response.data;
  };