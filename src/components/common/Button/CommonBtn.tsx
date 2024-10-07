/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

const CommonBtn = ({children}:any) => {
  return (
    <Button className="bg-[#b66055]  rounded-full">{children}</Button>
  );
};

export default CommonBtn