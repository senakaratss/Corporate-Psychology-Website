import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/appointments");
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || "Error in fetching appointments"
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

export default useAppointments;
