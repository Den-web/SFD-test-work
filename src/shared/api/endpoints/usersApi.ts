import { baseApi } from "@/shared/api/baseApi";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: "users" }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
