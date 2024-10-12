"use client";
// components/LoadingAnimation.tsx
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../../public/loading.json"

const LoadingAnimation = () => {
  return (
    <div className=" flex justify-normal items-center h-screen">
      <Lottie className='w-[200px] mx-auto  h-[200px]' animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default LoadingAnimation;