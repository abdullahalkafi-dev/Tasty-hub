import dynamic from "next/dynamic";
import { ReactNode } from "react";





  const DashboardContent = dynamic(
    () =>
      import(
        "@/app/(dashboardLayout)/dashboard/_components/DashboardComponent"
      ),
    {
      ssr: false,
    }
  );





const AdminLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className="">
      <DashboardContent>{children}</DashboardContent>
    </div>
  );
};

export default AdminLayout;
