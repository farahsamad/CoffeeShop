"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface blurredProps {
  src: string;
  imageAlt: string;
  className?: string;
}

const LoadingImage: React.FC<blurredProps> = ({ src, imageAlt, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  // const handleImageLoad = () => {
  //   setIsLoaded(true);
  // };

  return (
    <>
      {!isLoaded ? (
        <Image
          src={"/image/coffee-beans-loading.png"}
          alt={`${imageAlt}`}
          style={{ display: isLoaded ? "none" : "block" }}
          width={500}
          height={300}
          className={`${className} cursor-pointer`}
        />
      ) : (
        <Image
          src={src}
          alt={`${imageAlt} `}
          // onLoad={handleImageLoad}
          width={500}
          height={300}
          style={{ display: isLoaded ? "block" : "none" }}
          className={`${className} cursor-pointer`}
        />
      )}
    </>
  );
};

export default LoadingImage;
