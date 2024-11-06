"use client";
import Image from "next/image";
import bannerImg from "../../../../public/assignment-6-banner.jpg";
import Link from "next/link";

const HomePageBanner = () => {
  return (
    <div className="relative  h-[calc(100vh-64px)]   text-white overflow-hidden">
      <div className="absolute    inset-0">
        <Image
          src={bannerImg}
          alt="Recipe Food Banner"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority={true}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to Our TastyHub
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover the best recipes from around the world
        </p>
        <Link
          href="/recipe"
          className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HomePageBanner;
