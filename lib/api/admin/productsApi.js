import api from "@/lib/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddProduct = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (FormData) => {
      const response = api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/create`,
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
      // console.log(res);
      toast.success(res.data.message);
      // reset();
      // setPreview(null);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error.message);
    },
  });

  return { mutate, isAddProductLoading: isPending };
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`,
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
};

export const getProductMutation = (id) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  })
}