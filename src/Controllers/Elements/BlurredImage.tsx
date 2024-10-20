import React, { useState, useEffect } from "react";

interface blurredProps {
  src: string;
  blurredSrc: string;
  imageAlt: string;
}

const BlurredImage: React.FC<blurredProps> = ({
  src,
  blurredSrc,
  imageAlt,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
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
        <img
          src={blurredSrc}
          alt={`${imageAlt} blurred `}
          style={{ display: isLoaded ? "none" : "block" }}
        />
      ) : (
        <img
          src={src}
          alt={`${imageAlt} `}
          // onLoad={handleImageLoad}
          style={{ display: isLoaded ? "block" : "none" }}
        />
      )}
    </>
  );
};

export default BlurredImage;
