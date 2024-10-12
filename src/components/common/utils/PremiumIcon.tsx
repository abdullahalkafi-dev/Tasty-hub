import { Badge } from "lucide-react";

const PremiumIcon = () => {
  return (
    <div className="flex items-center border p-[2px] rounded-full gap-1">
    <Badge color="#60ADFB" fill="#60ADFB" />
    <p className="text-[#60ADFB] font-bold">Premium</p>
  </div>
  );
};

export default PremiumIcon;