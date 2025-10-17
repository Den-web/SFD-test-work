import StatsCard from "./components/StatsCard";
import { useDashboardData } from "./hooks/useDashboardData";
import Loader from "@/shared/ui/atoms/Loader";

export default function DashboardPage() {
  const { loading, stats } = useDashboardData();

  if (loading) return <Loader />;

  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(3, 1fr)" }}>
      <StatsCard title="Users" value={stats.users} />
      <StatsCard title="Posts" value={stats.posts} />
      <StatsCard title="Uptime" value={99.9} suffix="%" />
    </div>
  );
}
