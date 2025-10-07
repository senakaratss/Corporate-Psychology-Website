import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

export const useBlog = (id?: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("Blog ID is undefined");
      const res = await axiosInstance.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id, // id yoksa istek atma
  });
};
