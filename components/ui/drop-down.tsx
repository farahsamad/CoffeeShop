import React, { useState } from "react";
// import "../../component/Styles/Tailwind.css";
import { FaChevronDown } from "react-icons/fa";

type Option = {
  value: string;
  label: string;
};

interface DropDownProps {
  dropOptions: Option[];
  element: string;
  setContainElement: React.Dispatch<React.SetStateAction<string>>;
}

const DropDown: React.FC<DropDownProps> = ({ dropOptions, element, setContainElement }) => {
  //   const options: Option[] = [
  //     { value: "No water", label: "No water" },
  //     { value: "Water", label: "Water" },
  //   ];

  const handleSelectedOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContainElement(event.target.value);
  };

  return (
    <>
      <div className="relative inline-block w-64 h-fit max-h-fit leading-loose ">
        <select
          value={element}
          onChange={handleSelectedOption}
          className="block cursor-pointer appearance-none min-h-fit my-1 w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded-xl shadow-lg focus:outline-none focus:shadow-outline h-14"
        >
          {dropOptions.map((option) => (
            <option key={option.value} value={option.value} className="!cursor-pointer">
              {option.label}
            </option>
          ))}
        </select>
        <div className="select-arrow pointer-events-none border-2 rounded-full border-slate-700 absolute right-3 text-gray-700 transform translate-y-[40%] translate-x-[0%] ">
          <FaChevronDown className="fill-current h-2 w-4 block p-0 mt-[3.1px] ml-[-0.3px] text-gray-500" />
        </div>
      </div>
    </>
  );
};

export default DropDown;
