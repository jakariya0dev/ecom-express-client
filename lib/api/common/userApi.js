import api from "@/lib/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";

// export const getUsersMutation = (filterValue) => {
//   return useQuery({
//     queryKey: ["users", filterValue],
//     queryFn: async () => {
//       let url = "/users";
//       if (
//         filterValue === "active" ||
//         filterValue === "inactive" ||
//         filterValue === "pending" ||
//         filterValue === "blocked"
//       ) {
//         url = `/users?status=${filterValue}`;
//       }

//       if (filterValue === "verified") {
//         url = "/users?verified=true";
//       }

//       if (filterValue === "not_verified") {
//         url = "/users?verified=false";
//       }
//       return await api.get(url);
//     },
//   });
// };

export const getUsersMutation = (filterValue, searchValue) => {
  return useQuery({
    queryKey: ["users", filterValue, searchValue],
    queryFn: async () => {
      let url = "/users";
      const params = [];

      if (
        filterValue === "active" ||
        filterValue === "inactive" ||
        filterValue === "pending" ||
        filterValue === "blocked"
      ) {
        params.push(`status=${filterValue}`);
      }

      if (filterValue === "verified") {
        params.push("verified=true");
      }

      if (filterValue === "not_verified") {
        params.push("verified=false");
      }

      if (searchValue) {
        params.push(`search=${searchValue}`);
      }

      if (params.length) {
        url += `?${params.join("&")}`;
      }

      return await api.get(url);
    },
  });
};


export const changeUserStatusMutation = () => {
  return useMutation({
    mutationFn: async (userData) =>
      await api.post(`/users/change-status`, userData),
  });
};
