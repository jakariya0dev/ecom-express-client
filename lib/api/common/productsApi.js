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

export const getProductsMutation = (search, currentPage, filter) => {
  return useQuery({
    queryKey: ["products", search, currentPage, filter],
    queryFn: async () => {
      let url = "/products";
      let params = new URLSearchParams();
      if(search) params.append("search", search);
      if(currentPage) params.append("page", currentPage);
      if(filter) params.append("filter", filter);
      url = url + "?" + params.toString();
      return await api.get(url);
    },
  });
};

export const getSingleProductMutation = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => await api.get(`/products/${id}`),
  })
}

export const toggleFeaturedStatusMutation = () => {
  
  return useMutation({
    mutationFn: async (id) => await api.put(`/products/toggle-featured/${id}`),
  });
};

// product delete mutation
export const deleteProductMutation = () => {
  return useMutation({
    mutationFn: async (id) => await api.delete(`/products/${id}`),
  });
}

// product update mutation
export const updateProductMutation = () => {
  return useMutation({
    mutationFn: async ({ id, formData }) => await api.put(`/products/${id}`, formData),
  });
}