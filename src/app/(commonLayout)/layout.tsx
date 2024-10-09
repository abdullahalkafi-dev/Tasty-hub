import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto  dark:text-white text-black dark:bg-black">
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
