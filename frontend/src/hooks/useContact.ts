import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/contact");
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || "Error in fetching contacts"
          );
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Bilinmeyen bir hata oluştu");
        }
        return null;
      }
    },
    retry: false,
  });
};
