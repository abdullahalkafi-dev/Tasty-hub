import CommonBtn from "@/components/common/Button/CommonBtn";

import Image from "next/image";
import Link from "next/link";

const HomeShare = () => {
  return (
    <div className="flex flex-col mx-auto container md:min-h-[60vh] items-center md:flex-row py-20 md:p-10 gap-6">
      <div className="md:w-2/5 ">
        <Image
        className="w-full h-full "
          width={300}
          height={400}
          alt="Share you food recipe"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZSduifjHQTbSQC7ZoG1CD8mYbRbd3m2IRg&s"
          }
        />
      </div>
      <div className="md:w-3/5">
        <div className="text-center py-5 space-y-5">
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Share Your <span className="text-[#b66055]">recipes</span>
          </p>
            <p className="text-gray-500">
            Share your favorite recipes with the world and get feedback from
            other food lovers.
            </p>
           
        <Link href={'/dashboard/add-recipe'}><CommonBtn>Share your recipe</CommonBtn></Link>  
        </div>
      </div>
    </div>
  );
};

export default HomeShare;
