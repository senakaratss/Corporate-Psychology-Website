import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

const useBlogCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/categories");
        return res.data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(
            err.response?.data?.message || "Error in fetching categories"
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

export default useBlogCategories;
