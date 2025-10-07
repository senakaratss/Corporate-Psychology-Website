import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/services");
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || "Error in fetching services"
          );
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Bilinmeyen bir hata oluştu");
        }
        return null; // React Query için null döndür     }
      }
    },
    retry: false,
  });
};

export default useServices;
