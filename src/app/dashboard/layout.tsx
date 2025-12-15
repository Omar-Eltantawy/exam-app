import { DashboardSidebar } from "./_components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar always visible */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
