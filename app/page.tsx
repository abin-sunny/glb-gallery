import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardPage() {
  const res = fetch("http://localhost:3000/api/models");
  return <DashboardShell data={res} />;
}
