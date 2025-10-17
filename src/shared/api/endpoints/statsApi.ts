import { baseApi } from "@/shared/api/baseApi";

export type Post = {
  id: number;
  title: string;
};

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({ url: "posts" }),
    }),
  }),
});

export const { useGetPostsQuery } = statsApi;
