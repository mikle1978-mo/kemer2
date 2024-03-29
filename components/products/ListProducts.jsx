"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem";
import cl from "./ListProducts.module.css";

const ListProducts = ({ data }) => {
    return (
        <>
            <Filters />
            <main className={cl.listProduct}>
                {data?.products?.map((product) => (
                    <ProductItem key={product?._id} product={product} />
                ))}

                {/* <CustomPagination
                            resPerPage={data?.resPerPage}
                            productsCount={data?.filteredProductsCount}
                        /> */}
            </main>
        </>
    );
};

export default ListProducts;
