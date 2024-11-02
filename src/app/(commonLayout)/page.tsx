import HomeBlogSection from "@/components/page components/HomePage/HomeBlogSection";
import HomeCategory from "@/components/page components/HomePage/HomeCategory";
import HomePageBanner from "@/components/page components/HomePage/HomePageBanner";
import HomeRecipeSection from "@/components/page components/HomePage/HomeRecipeSection";
import HomeShare from "@/components/page components/HomePage/HomeShare";
import HomeStayInTouch from "@/components/page components/HomePage/HomeStayInTouch";

export default function Home() {
  return (
    <main className="">
   
      <HomePageBanner />
      <HomeShare />
      <HomeCategory />
      <HomeRecipeSection />
      <HomeBlogSection />
      <HomeStayInTouch />
    </main>
  );
}
