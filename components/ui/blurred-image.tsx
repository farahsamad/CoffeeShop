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
      ? { width: 800, height: 450 } // smaller banner image
      : { width: 1200, height: 800 }; // large and consistent everywhere else

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: "100%",
        maxWidth: variant === "hero" ? "800px" : "1200px",
        margin: "0 auto",
      }}
    >
      <Image
        src={src}
        alt={imageAlt}
        width={imageDimensions.width}
        height={imageDimensions.height}
        placeholder="blur"
        blurDataURL={blurredSrc}
        priority={priority}
        className="object-cover w-full h-auto"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
};

export default BlurredImage;
