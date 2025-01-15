import { useState, ChangeEvent } from "react";
import { BiTime } from "react-icons/bi";

interface InputProps {
  placeholder: string;
  icon: string;
  id: string;
  type: string;
  name: string;
  setExpireDate: React.Dispatch<React.SetStateAction<string>>;
}

const MonthYearInput: React.FC<InputProps> = ({
  placeholder,
  icon,
  id,
  type,
  name,
  setExpireDate,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    if (inputValue.length <= 6) {
      const formattedValue = inputValue
        .replace(/(\d{2})(\d{4})/, "$1/$2") // Format as MM/YYYY
        .substring(0, 7); // Limit to 7 characters
      setValue(formattedValue);
      setExpireDate(formattedValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Basic validation: Ensure the input is a valid MM/YYYY
    const [month, year] = value.split("/");
    if (
      !value ||
      value.length !== 7 ||
      Number(month) < 1 ||
      Number(month) > 12 ||
      Number(year) < 1000
    ) {
      setValue(""); // Reset the value if invalid
    }
  };

  return (
    <div
      className="flex h-fit items-center w-full"
      style={{
        borderBottomWidth: "2px",
        borderBottomColor: isFocused ? "rgb(17,44,103)" : "",
      }}
    >
      {icon === "BiTime" && (
        <BiTime
          style={{
            color: isFocused ? "rgb(17,44,103)" : "",
          }}
          className="text-black ml-[2px] mr-[2px] w-5 h-3"
        />
      )}

      {icon !== "" ? (
        <hr
          className="h-[2%] w-[14px] my-2 border rotate-90"
          style={{
            borderColor: isFocused ? "rgb(17,44,103)" : "",
          }}
        />
      ) : null}

      <div className="relative">
        <label
          htmlFor={id} // Use the passed id for label connection
          className={`absolute left-0 transition-all text-xs ${
            isFocused || value ? "-top-[6px] text-gray-700" : "top-[7px] text-gray-600 cursor-text"
          }`}
          style={{
            color: isFocused ? "rgb(17,44,103)" : "",
          }}
        >
          {placeholder} <span className="text-[6.5px] sm:!text-xs">(MM/YYYY)</span>
          <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          type={type}
          id={id} // Pass id directly to input
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          name={name}
          maxLength={7}
          className="block w-full py-2 outline-none cursor-text bg-transparent focus:outline-none sm:!text-base text-xs h-9"
        />
      </div>
    </div>
  );
};

export default MonthYearInput;
