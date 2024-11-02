// import type { Metadata } from "next";

import "./globals.css";
// import 'quill/dist/quill.snow.css'; // Import the Quill stylesheet

import AppProvider from "@/provider/app-provider";
// import Head from "next/head";

// export const metadata: Metadata = {
//   title: {
//     default: "Tasty Hub",
//     template: "%s | Tasty Hub",
//   },
//   openGraph: {
//     title: "Tasty Hub - Discover Delicious Recipes and Culinary Inspiration",
//     description:
//       "Discover and share delicious recipes from around the world! TastyHub is your go-to platform for home-cooked meals, easy recipes, and culinary inspiration for every occasion.",
//     images: ["https://tasty-hub-chi.vercel.app/assignment-6-banner.jpg"],
//   },
//   description:
//     "Discover and share delicious recipes from around the world! TastyHub is your go-to platform for home-cooked meals, easy recipes, and culinary inspiration for every occasion.",

//   metadataBase: new URL("https://tasty-hub-chi.vercel.app"),
//   keywords: [
//     "easy recipes",
//     "healthy food ideas",
//     "recipe sharing community",
//     "quick meals",
//     "vegetarian meal ideas",
//     "international recipes collection",
//     "food blog inspiration",
//     "home-cooked meals",
//     "delicious dinner recipes",
//     "easy cooking tips",
//     "global cuisine recipes",
//     "simple meal prep",
//     "weeknight dinner ideas",
//     "family-friendly recipes",
//     "wholesome ingredients",
//     "fast and easy meals",
//     "meal planning",
//     "kitchen tips",
//     "dessert recipes",
//     "healthy snacks",
//   ],
//   authors: [{ name: "Tasty Hub" }],
// publisher: "Tasty Hub",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         {/* <Head>
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
      </Head> */}
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      <body className="bg-white  dark:bg-black">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
