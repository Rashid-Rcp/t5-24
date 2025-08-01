import { cookies } from "next/headers";

export const getHeaderConfig = async () => {
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