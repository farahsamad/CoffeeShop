import React, { useEffect, useState, useRef } from "react";
import useScroll from "@/hooks/useScroll";

interface countProps {
  initialValue: number;
  targetValue: number;
}

function Counter({ initialValue, targetValue }: countProps) {
  const [count, setCount] = useState(initialValue);
  const [start, setStart] = useState(false);
  const elementScrollRef = useRef<HTMLSpanElement>(null);
  const elementRefVisible = useScroll(elementScrollRef);

  useEffect(() => {
    const setVisible = () => {
      if (elementRefVisible) setStart(true);
    };
    setVisible();
  }, [start, elementRefVisible]);
  const duration = 4000; // 4 seconds

  useEffect(() => {
    if (start) {
      let startValue = initialValue;
      const interval = Math.floor(duration / (targetValue - initialValue));

      const counter = setInterval(() => {
        startValue += 1;
        setCount(startValue);
        if (startValue >= targetValue) {
          clearInterval(counter);
        }
      }, interval);

      return () => {
        clearInterval(counter);
      };
    }
  }, [start, targetValue, initialValue]);

  return (
    <span className="num" ref={elementScrollRef}>
      {count}
    </span>
  );
}

export default Counter;
