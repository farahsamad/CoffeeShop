import React, { useRef, useState, useEffect } from "react";

interface inputProps {
  placeholder: string;
  type: string;
  name: string;
  // labelRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const FloatingInput: React.FC<inputProps> = ({
  placeholder,
  type,
  name,
  // labelRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const [value, setValue] = useState("");
  // const labelRef = useRef<HTMLLabelElement>(null);

  const handleLabelClick = () => {
    if (isFocused || value) {
      console.log("clickk");
      if (isLabelFocused) {
        setIsLabelFocused(true);
        console.log("label focused");
      } else {
        setIsLabelFocused(true);
        setIsFocused(true);
        console.log("label not focused");
      }
    } else {
      console.log("ccccccc");
      setIsFocused(true);

      setIsLabelFocused(true);
    }
  };
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       labelRef.current &&
  //       // !labelRef.current.contains(event.target as Node)
  //     ) {
  //       console.log("Clicked outside the div!");
  //       if (isFocused || value) {
  //         setIsFocused(true);
  //       } else {
  //         setIsFocused(false);
  //       }
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative">
      <label
        className={`absolute left-0 transition-all ${
          isFocused || value
            ? "-top-3 text-sm text-gray-700"
            : "top-[6px] text-gray-600 cursor-text"
        }`}
        htmlFor={type}
        // ref={labelRef}
      >
        {placeholder}
        <span className="text-red-500 font-bold">*</span>
        {/* {isFocused || value ? "*" : "*"} */}
      </label>
      <input
        id={type}
        type={type}
        name={name}
        maxLength={type === "text" ? 20 : 40}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="check-input  block w-full px-2 py-2 outline-none cursor-text bg-transparent focus:outline-none focus:border-b focus:border-blue-600"
        // placeholder={isFocused || value ? "" : "Name"}
      />
    </div>
  );
};

export default FloatingInput;
