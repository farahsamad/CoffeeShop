"use client";

import { search } from "@/actions/search";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchFormProps {
  searchRef: React.RefObject<HTMLDivElement | null>;
}

interface IFormInputs {
  search: string;
}
interface SearchedProductsProps {
  id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productTypeName: string;
}

const SearchForm = ({ searchRef }: SearchFormProps) => {
  const [searchedProducts, setSearchedProducts] = useState<SearchedProductsProps[] | null>([]);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();
  const watchSearch = watch("search");
  useEffect(() => {
    if (watchSearch) {
      handleSubmit(onSubmit)();
    }
  }, [watchSearch]);
  const onSubmit = async (data: IFormInputs) => {
    const searched = data.search.charAt(0).toUpperCase() + data.search.slice(1);
    console.log("searched: ", searched);
    const searching = await search(searched);
    setSearchedProducts(searching);
    console.log("searching: ", searching);
  };
  return (
    <Form
      action={""}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   handleSubmit(onSubmit)();
      // }}
      className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div
        ref={searchRef}
        className="min-w-[200px] w-full md:!w-[500px] lg:w-[600px] fixed md:!left-[50%] bottom-[0%] z-50 grid max-w-[600px] md:!translate-x-[-50%] md:!translate-y-[-50%] translate-y-[0%] gap-4 border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[75vh] md:!h-96 md:!max-h-96 md:!top-[50%] md:!bottom-[50%]"
      >
        <div className="flex h-[75vh] md:!h-96 md:!max-h-96 w-full flex-col py-4">
          <div className="w-full h-fit py-2 border-b border-gray-700">
            <input
              type="text"
              id=""
              className="w-full bg-transparent outline-none border-none h-8 px-4 text-xl"
              placeholder="What are you searching for?"
              {...register("search", { required: true, maxLength: 50 })}
            />
          </div>
          <div className="w-full flex flex-col flex-grow min-h-0 max-h-full overflow-auto pt-2">
            {searchedProducts &&
              searchedProducts.map((value, index, array) => {
                return (
                  <div
                    key={value.id}
                    className="px-7 py-2 font-bold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md  rounded-lg transition-transform duration-300 transform flex items-center"
                  >
                    <Image
                      src={`/image/${value.productImage}`}
                      alt={value.productName}
                      width={30}
                      height={30}
                      className="rounded-full mr-7 h-7 w-7 object-cover"
                    />
                    <Link href={`/menu/${value.id}/${value.productName}`}>{value.productName}</Link>

                    {value.productTypeName.toLowerCase().startsWith(watchSearch) && (
                      <div className="text-xs text-gray-500 mt-1 flex grow justify-end">
                        {value.productTypeName}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
