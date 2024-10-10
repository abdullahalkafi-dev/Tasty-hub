import dynamic from "next/dynamic";
import { ReactNode } from "react";

const DashboardContent = dynamic(
  () =>
    import("@/app/(dashboardLayout)/dashboard/_components/DashboardComponent"),
  {
    ssr: false,
  }
);

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardContent>{children}</DashboardContent>;
};

export default AdminLayout;
