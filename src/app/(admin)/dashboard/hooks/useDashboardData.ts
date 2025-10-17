"use client";
import { useGetUsersQuery } from "@/shared/api/endpoints/usersApi";
import { useGetPostsQuery } from "@/shared/api/endpoints/statsApi";

export function useDashboardData() {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: posts, isLoading: postsLoading } = useGetPostsQuery();

  const loading = usersLoading || postsLoading;
  const stats = {
    users: users?.length ?? 0,
    posts: posts?.length ?? 0,
  };

  return { loading, stats };
}
