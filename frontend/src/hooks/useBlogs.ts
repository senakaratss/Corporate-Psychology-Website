import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Error in fetching blogs");
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

export default useBlogs;
