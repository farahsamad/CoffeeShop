import React, { useState, useEffect } from "react";

interface blurredProps {
  src: string;
  imageAlt: string;
}

const LoadingImage: React.FC<blurredProps> = ({ src, imageAlt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
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
        <img
          src={require("../../component/image/coffee-beans-loading.png")}
          alt={`${imageAlt}`}
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

export default LoadingImage;
