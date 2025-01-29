"use client";

import { search } from "@/actions/search";
import Form from "next/form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingImage from "./ui/loading-image";

interface SearchFormProps {
  searchRef: React.RefObject<HTMLDivElement | null>;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
  barClick: () => void;
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

const SearchForm = ({ searchRef, setIsSearchVisible, barClick }: SearchFormProps) => {
  const [searchedProducts, setSearchedProducts] = useState<SearchedProductsProps[] | null>(null);
  const { register, watch, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      search: "",
    },
  });
  const watchSearch = watch("search");
  useEffect(() => {
    if (watchSearch) {
      handleSubmit(onSubmit)();
    } else {
      setSearchedProducts(null);
    }
  }, [watchSearch]);

  const onSubmit = async (data: IFormInputs) => {
    const searched = data.search.charAt(0).toUpperCase() + data.search.slice(1);
    const searching = await search(searched);
    setSearchedProducts(searching);
  };

  return (
    <Form
      action={""}
      className="w-full h-full fixed  z-[1000] inset-0 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div
        ref={searchRef}
        className="min-w-[200px] w-screen md:!w-[400px] fixed md:!left-[50%] bottom-[0%] z-50 grid max-w-[400px] md:!translate-x-[-50%] md:!translate-y-[-50%] translate-y-[0%] gap-4 border bg-white shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg h-[75vh] md:!h-96 md:!max-h-96 md:!top-[50%] md:!bottom-[50%]"
      >
        <div className="flex h-[75vh] md:!h-96 md:!max-h-96 w-full flex-col py-4">
          <div className="w-full h-fit py-2 border-b border-gray-700">
            <input
              autoComplete="off"
              type="text"
              id=""
              className="w-full bg-transparent outline-none border-none h-8 px-4 text-xl"
              placeholder="What are you searching for?"
              {...register("search", { required: true, maxLength: 50 })}
            />
          </div>
          <div
            id="searched-value-container"
            className="w-full flex flex-col flex-grow min-h-0 max-h-full overflow-auto "
          >
            {searchedProducts ? (
              searchedProducts.map((value) => {
                return (
                  <Link
                    onClick={() => {
                      setIsSearchVisible(false);
                      barClick();
                    }}
                    href={{
                      pathname: `/menu/${value.id}/${value.productName}`,
                      query: {
                        product_id: value.id,
                        product_name: value.productName,
                        product_image: value.productImage,
                        product_price: value.productPrice,
                        coffeeType_name: value.productTypeName,
                      },
                    }}
                    key={value.id}
                    className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                  >
                    <LoadingImage
                      src={`/image/${value.productImage}`}
                      imageAlt={value.productName}
                      className="rounded-full mr-7 h-7 w-7 object-cover"
                    />

                    <div className="group-hover/item:text-white">{value.productName}</div>

                    {value.productTypeName.toLowerCase().startsWith(watchSearch) && (
                      <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                        {value.productTypeName}
                      </div>
                    )}
                  </Link>
                );
              })
            ) : (
              <>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5lofghx0000u0m8zlspexpb/Cappuccino`,
                    query: {
                      product_id: "cm5lofghx0000u0m8zlspexpb",
                      product_name: "Cappuccino",
                      product_image: "cappuccino.png",
                      product_price: 5,
                      coffeeType_name: "Hot coffees",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/cappuccino.png`}
                    imageAlt={"Cappuccino"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Cappuccino</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Hot coffees
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5lopkkw000mu0m816wgzma5/Chai Tea`,
                    query: {
                      product_id: "cm5lopkkw000mu0m816wgzma5",
                      product_name: "Chai Tea",
                      product_image: "chai-tea.jpg",
                      product_price: 3,
                      coffeeType_name: "Hot Tea",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/chai-tea.jpg`}
                    imageAlt={"Chai Tea"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Chai Tea</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Hot Tea
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5loqk7n000pu0m8xqnhr8d1/Hot Chocolate`,
                    query: {
                      product_id: "cm5loqk7n000pu0m8xqnhr8d1",
                      product_name: "Hot Chocolate",
                      product_image: "hot-chocolate.jpg",
                      product_price: 4,
                      coffeeType_name: "Hot Chocolate",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/hot-chocolate.jpg`}
                    imageAlt={"Hot Chocolate"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Hot Chocolate</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Hot Chocolate
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5lov9su0013u0m8tw040ivq/Strawberry Smoothie`,
                    query: {
                      product_id: "cm5lov9su0013u0m8tw040ivq",
                      product_name: "Strawberry Smoothie",
                      product_image: "cup-strawberry-smoothie.png",
                      product_price: 5,
                      coffeeType_name: "Smoothie",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/cup-strawberry-smoothie.png`}
                    imageAlt={"Strawberry Smoothie"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Strawberry Smoothie</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Smoothie
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5lon0l8000hu0m8f5ectsx2/Iced Shaken Espresso`,
                    query: {
                      product_id: "cm5lon0l8000hu0m8f5ectsx2",
                      product_name: "Iced Shaken Espresso",
                      product_image: "iced-shaken-espresso.jpeg",
                      product_price: 4,
                      coffeeType_name: "Cold Coffees",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/iced-shaken-espresso.jpeg`}
                    imageAlt={"Iced Shaken Espresso"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Iced Shaken Espresso</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Cold Coffees
                  </div>
                </Link>
                <Link
                  onClick={() => {
                    setIsSearchVisible(false);
                    barClick();
                  }}
                  href={{
                    pathname: `/menu/cm5loh68q0002u0m89rpb66d5/Espresso`,
                    query: {
                      product_id: "cm5loh68q0002u0m89rpb66d5",
                      product_name: "Espresso",
                      product_image: "espresso.jpg",
                      product_price: 4,
                      coffeeType_name: "Hot coffees",
                    },
                  }}
                  className="group/item px-7 py-4 font-semibold hover:bg-[#c4bbbb] cursor-pointer hover:rounded-md    duration-300 transform flex items-center border-b border-b-neutral-300 transition-all"
                >
                  <LoadingImage
                    src={`/image/espresso.jpg`}
                    imageAlt={"Espresso"}
                    className="rounded-full mr-7 h-7 w-7 object-cover"
                  />

                  <div className="group-hover/item:text-white">Espresso</div>
                  <div className="text-xs text-gray-500 mt-1 flex grow justify-end group-hover/item:text-white">
                    Hot coffees
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
