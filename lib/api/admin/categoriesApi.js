import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api/api";
import { toast } from "react-toastify";

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

export const useAddCategory = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (FormData) => {
      const response = api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/create`,
        FormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response;
    },
    onSuccess: (res) => {
      console.log(res);
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error.message);
    },
  });

  return { mutate, isAddCategoryLoading: isPending, isSuccess };
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id) => {
      const response = api.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
      );
      return response;
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: (formData) => {
      const res = api.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${formData.get('id')}`, formData);
      return res;
    }
  });
}
