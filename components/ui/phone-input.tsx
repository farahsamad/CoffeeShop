import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref" | "setIsFocused" | "isFocused"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange" | "onFocus" | "onBlur"> & {
    onChange?: (value: RPNInput.Value) => void;
    setIsFocused: (value: React.SetStateAction<boolean>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    isFocused?: boolean;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, setIsFocused, isFocused, onFocus, onBlur, ...props }, ref) => {
  return (
    <>
      <RPNInput.default
        ref={ref}
        defaultCountry="LB"
        //       inputComponent={(inputProps) => (
        //         <InputComponent {...inputProps} setIsFocused={setIsFocused} isFocused={isFocused} />
        //       )}

        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        {...props}
        className={cn("flex", className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        countryCallingCodeEditable={false}
        smartCaret={false}
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
        {...props}
      />
      <hr
        className=" absolute top-[50%] left-[35px] h-[0%] w-[13px] border rotate-90 !mx-auto !my-0"
        style={{
          borderColor: isFocused ? "rgb(17,44,103)" : "",
        }}
      />
    </>
  );
});
PhoneInput.displayName = "PhoneInput";
let val = false;

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <>
      <Input className={cn("", className)} {...props} ref={ref} id="phone-number-input-container" />
    </>
  )
);
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 mr-[15px] w-6 h-6 my-auto border-r-0 !ml-[2px] focus:z-10 !outline-none focus:!ring-0 focus-visible:!ring-0 !rounded-none !px-0 !bg-none !shadow-none"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown
            className={cn("-mr-2 size-4 opacity-50", disabled ? "hidden" : "opacity-100")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
        country
      )}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
