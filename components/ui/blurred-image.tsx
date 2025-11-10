import Image from "next/image";
import React from "react";

interface BlurredProps {
  src: string;
  blurredSrc: string; // base64 or small blurred image
  imageAlt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  variant?: "hero" | "default"; // new prop
  className?: string;
}

const BlurredImage: React.FC<BlurredProps> = ({
  src,
  blurredSrc,
  imageAlt,
  width = 500,
  height = 300,
  priority = false,
  variant = "default",
  className = "",
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
  //         src={blurredSrc}
  //         alt={`${imageAlt} blurred`}
  //         style={{ display: isLoaded ? "none" : "block" }}
  //         width={500}
  //         height={300}
  //       />
  //     ) : (
  //       <Image
  //         src={src}
  //         alt={imageAlt}
  //         loading={priority ? "eager" : "lazy"}
  //         priority={priority}
  //         width={500}
  //         height={300}
  //         style={{ display: "block" }}
  //       />
  //     )}
  //   </>
  // );
  // Default dimensions for each variant
  const imageDimensions =
    variant === "hero"
      ? { width: 1000, height: 400 } // banner image
      : { width: 800, height: 500 }; // all other images

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width || imageDimensions.width}
      height={height || imageDimensions.height}
      placeholder="blur"
      blurDataURL={blurredSrc}
      priority={priority}
      className={className}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "auto",
        display: "block",
      }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};

export default BlurredImage;
