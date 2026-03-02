import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api/api";

export const addVariantMutation = () => {

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post(`/variants/create`, formData);
      return data;
    },
  });
};


// Hook to get a single variant
export const getSingleVariantMutation = (variantId) => {
  return useQuery({
    queryKey: ["variant", variantId],
    queryFn: async () => {
      const { data } = await api.get(`/variants/${variantId}`);
      return data.data; // Adjust based on your API response structure
    },
    enabled: !!variantId,
  });
};

console.log();

// Hook to update a variant
export const updateVariantMutation = () => {
  return useMutation({
    mutationFn: async ({ variantId, formData }) => {
      const { data } = await api.put(`/variants/${variantId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      return data;
    },
  });
};