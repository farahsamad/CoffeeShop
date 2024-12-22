import Image from "next/image";
import React, { useState, useEffect } from "react";

interface blurredProps {
  src: string;
  blurredSrc: string;
  imageAlt: string;
}

const BlurredImage: React.FC<blurredProps> = ({ src, blurredSrc, imageAlt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = src;
  }, [src, blurredSrc]);

  // const handleImageLoad = () => {
  //   setIsLoaded(true);
  // };

  return (
    <>
      {!isLoaded ? (
        <Image
          src={blurredSrc}
          alt={`${imageAlt} blurred `}
          style={{ display: isLoaded ? "none" : "block" }}
          width={500}
          height={300}
        />
      ) : (
        <Image
          src={src}
          alt={`${imageAlt} `}
          // onLoad={handleImageLoad}
          width={500}
          height={300}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      )}
    </>
  );
};

export default BlurredImage;
