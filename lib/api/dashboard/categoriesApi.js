import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/api";

export const useGetCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return { categoriesData: data, isGetCategoriesLoading: isLoading };
};
