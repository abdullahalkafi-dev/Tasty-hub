import Subheading from "@/components/common/subHeading/Subheading";
import { getCategories } from "@/services/categories";
import { TCategory } from "@/types/foodCategory";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HomeCategory = async () => {
  const res = await getCategories("4");
  const categories = res.data;

  return (
   
      <div className="container mx-auto">
        <Subheading text="Popular Categories" />

        <div className="grid grid-cols-1 py-10 mt-5 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.map((category: TCategory) => {
            return (
              <HoverCard key={category._id} openDelay={50} closeDelay={300}>
                <HoverCardTrigger >
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={category.image}
                      width={200}
                      height={200}
                      alt="category"
                      className="rounded-full object-cover object-center w-[250px] h-[250px]"
                    />
                    <p className="font-bold text-3xl pt-4">{category.name}</p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="bg-[#FFF0ED] rounded-xl">
                <div >
                  <p className="font-medium">
                    {category.categoryDescription}
                  </p>
                </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
      </div>
   
  );
};

export default HomeCategory;
