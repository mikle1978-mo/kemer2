"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem";
import cl from "./ListProducts.module.css"

const ListProducts = ({ data }) => {
  return (
    <section className="py-8">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className={cl.listProduct}>
            {data?.products?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}


          </main>
          <CustomPagination
            resPerPage={data?.resPerPage}
            productsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
