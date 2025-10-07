import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

export const useService = (id?: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      if (!id) throw new Error("Service ID is undefined");
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    },
    enabled: !!id, // id yoksa istek atma
  });
};
