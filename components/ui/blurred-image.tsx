import Image from "next/image";
import React, { useState, useEffect } from "react";

interface BlurredProps {
  src: string;
  blurredSrc: string;
  imageAlt: string;
  priority?: boolean;
}

const BlurredImage: React.FC<BlurredProps> = ({ src, blurredSrc, imageAlt, priority }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      {!isLoaded ? (
        <Image
          src={blurredSrc}
          alt={`${imageAlt} blurred`}
          style={{ display: isLoaded ? "none" : "block" }}
          width={500}
          height={300}
        />
      ) : (
        <Image
          src={src}
          alt={imageAlt}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          width={500}
          height={300}
          style={{ display: "block" }}
        />
      )}
    </>
  );
};

export default BlurredImage;
