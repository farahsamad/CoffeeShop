"use server";

import { searchProduct } from "@/data/search";

export const search = async (search: string) => {
  try {
    // const data: string = "Cappucc";
    const searchResults = await searchProduct(search);
    console.log("searchResults: ", searchResults);
    return searchResults;
  } catch (error) {
    if (error instanceof Error) {
      console.log("search error message server: ", error.message);
    } else {
      console.log("search error server: ", error);
    }
    return null;
  }
};
