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

export const getUsersMutation = (filterValue, searchValue, currentPage) => {
  return useQuery({
    queryKey: ["users", filterValue, searchValue, currentPage],
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

      if (currentPage) {
        params.push(`page=${currentPage}`);
      }

      if (params.length) {
        url += `?${params.join("&")}`;
      }

      // test limit
      // url += `&limit=2`;
      return await api.get(url);
    },
    keepPreviousData: true,
  });
};


export const changeUserStatusMutation = () => {
  return useMutation({
    mutationFn: async (userData) =>
      await api.post(`/users/change-status`, userData),
  });
};
