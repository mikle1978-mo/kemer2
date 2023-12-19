import React from "react";
import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import { dbConnect } from "@/backend/config/dbConnect";
import queryString from "query-string";

export const metadata = {
  title: "Next.js 13 Ecommerce App",
};

const HomePage = async ({ searchParams }) => {
  dbConnect()
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );

  return <ListProducts data={data} />;
};

export default HomePage;
