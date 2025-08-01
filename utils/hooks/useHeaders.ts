import { cookies } from "next/headers";

export const useHeaders = async () => {
  const cookieStore = await cookies();
  
  return {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  };
}; 