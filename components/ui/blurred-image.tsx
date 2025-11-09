import Image from "next/image";
import React from "react";

interface BlurredProps {
  src: string;
  blurredSrc: string; // base64 or small blurred image
  imageAlt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const BlurredImage: React.FC<BlurredProps> = ({
  src,
  blurredSrc,
  imageAlt,
  width = 500,
  height = 300,
  priority = false,
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

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurredSrc}
      priority={priority}
      style={{ display: "block" }}
      // sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};

export default BlurredImage;
