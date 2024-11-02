import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
// import Head from "next/head";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto  dark:text-white text-black dark:bg-black">
           {/* <Head> */}
           <meta property="og:title" content="TastyHub - Delicious Recipes" />
        <meta property="og:description" content="Explore easy, delicious recipes from around the world on TastyHub." />
        <meta property="og:image" content="/assignment-6-banner.jpg" />
           <link rel="canonical" href="https://tasty-hub-chi.vercel.app/" />
        <title>Tasty Hub - Discover Recipes</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": "Tasty Hub",
              "description": "Discover and share delicious recipes from around the world.",
              "image": "https://tasty-hub-chi.vercel.app/assignment-6-banner.jpg",
              "author": {
                "@type": "Person",
                "name": "Tasty Hub",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Tasty Hub",
                "logo": "https://res.cloudinary.com/dwirxf3qm/image/upload/v1730292074/Tasty_hub_utbhpo.png",
              },
            }),
          }}
        />
      {/* </Head> */}
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
