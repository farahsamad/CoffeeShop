"use client";

import Image from "next/image";
import React from "react";

interface LoadingImageProps {
  src: string;
  imageAlt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  blurSrc?: string; // optional small blurred image
}

const LoadingImage: React.FC<LoadingImageProps> = ({
  src,
  imageAlt,
  className = "",
  width = 500,
  height = 300,
  priority = false,
  blurSrc = "/image/coffee-beans-loading.png",
}) => {
  // const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   const img = new window.Image();
  //   img.onload = () => {
  //     setIsLoaded(true);
  //   };
  //   img.src = src;
  // }, [src]);

  // return (
  //   <>
  //     {!isLoaded ? (
  //       <Image
  //         src={"/image/coffee-beans-loading.png"}
  //         alt={`${imageAlt}`}
  //         style={{ display: isLoaded ? "none" : "block" }}
  //         width={500}
  //         height={300}
  //         className={`${className} cursor-pointer`}
  //       />
  //     ) : (
  //       <Image
  //         src={src}
  //         alt={`${imageAlt} `}
  //         // onLoad={handleImageLoad}
  //         width={500}
  //         height={300}
  //         style={{ display: isLoaded ? "block" : "none" }}
  //         className={`${className} cursor-pointer`}
  //       />
  //     )}
  //   </>
  // );
  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      // style={{ objectFit: "cover", width: "100%", height: "auto" }}
      className={`${className} cursor-pointer`}
      placeholder={blurSrc ? "blur" : undefined}
      blurDataURL={blurSrc}
      priority={priority}
    />
  );
};

export default LoadingImage;
