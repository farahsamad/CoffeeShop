import { useState, useEffect } from "react";

const useScroll = (ref: React.RefObject<HTMLSpanElement | null>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 } // Adjust threshold as needed
    );
    const elementRef = ref.current;

    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [ref]);

  return isIntersecting;
};

export default useScroll;
