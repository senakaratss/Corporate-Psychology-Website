import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
    enabled: true, // sadece çağrıldığı yerde çalışır
  });
};

export default useAuth;
