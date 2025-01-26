import React, { useEffect, useState } from "react";
import CoffeeProductCart from "./coffee-product-cart";
import { ProductDetails } from "./cart";

interface CoffeeTypeCartProps {
  value: string;
  index: number;
  groupedProducts: {
    [key: string]: ProductDetails[];
  };
  menuContainerRefs: React.RefObject<(HTMLDivElement | null)[]>;
  lastIndex: number;
}

const CoffeeTypeCart = ({
  value,
  index,
  groupedProducts,
  menuContainerRefs,
  lastIndex,
}: CoffeeTypeCartProps) => {
  const [containerId, setContainerId] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      let element = hash.split("#").join("");
      element = element.split("%20").join(" ");
      if (element === containerId) {
        const elementId = document.getElementById(element);
        if (elementId) {
          elementId.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
          );
        }
      }
    }
  }, [containerId, value]);
  useEffect(() => {
    if (value.includes(" ")) {
      setContainerId(value.replace(/ /g, "-"));
    } else {
      setContainerId(value);
    }
  }, [value]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleIndex = -1;
        entries.forEach((entry, index) => {
          if (entry.isIntersecting && visibleIndex === -1) {
            visibleIndex = index;
            entry.target.querySelector(".animate-rays")?.classList.add("visible");
            entry.target.querySelector(".zigzag-div")?.classList.add("visible");
          } else {
            entry.target.querySelector(".animate-rays")?.classList.remove("visible");
            entry.target.querySelector(".zigzag-div")?.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    menuContainerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      menuContainerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  const uniqueId = `zigzagPath-${index}`;

  return (
    <div
      className="coffee-type-container relative"
      key={`type-${value}`}
      ref={(el) => {
        menuContainerRefs.current[index] = el;
      }}
    >
      <div className="hot-coffees-sentence">
        <div className="menu-sentence" id={containerId}>
          {value}
        </div>
        <hr />
      </div>
      <div className="coffees-content">
        <div className="coffees-content-container">
          {groupedProducts[value].map((product) => (
            <CoffeeProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-[-14%] md:left-[-10%] flex flex-col h-full">
        <div className="bg-black rounded-full h-6 w-6 relative">
          <div className="animate-rays"></div>
          <div className="after:absolute after:bg-slate-300 after:content-[''] after:h-[0.75rem] after:w-[0.75rem] after:right-0 after:bottom-0 after:z-[-1] before:absolute before:bg-slate-300 before:content-[''] before:h-[0.75rem] before:w-[0.75rem] before:left-0 before:bottom-0 before:z-[-1] before:border-l before:border-l-black after:border-r after:border-r-black"></div>
        </div>
        <div
          className={`bg-slate-300 grow w-6 border-x border-x-black relative overflow-hidden ${
            index === lastIndex ? "!mb-0 rounded-b-full" : "mb-[-38px]"
          }`}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id={uniqueId} clipPathUnits="objectBoundingBox">
                <path
                  d="M 0.5 0 L 0.55 0.1 Q 0.6 0.2 0.5 0.3 
           T 0.5 0.5 Q 0.6 0.6 0.5 0.7 
           T 0.5 1 L 0.5 1 Z"
                />
              </clipPath>
            </defs>
          </svg>
          <div
            className="zigzag-div absolute top-0 left-[-275%] w-36 h-full transition-all"
            style={{ clipPath: `url(#${uniqueId})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeTypeCart;
