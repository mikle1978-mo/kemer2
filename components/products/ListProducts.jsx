"use client";

import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import Filters from "../../app/filters/page";
import ProductItem from "./ProductItem";
import ReclamItem from "./ReclamItem";
import cl from "./ListProducts.module.css";

const ListProducts = ({ data }) => {
    return (
        <>
            <div style={{ visibility: "hidden" }}>
                <h1 className='hiddenTitle'>
                    Лист товаров, продуктов и услуг в Кемере
                </h1>
            </div>
            <main className={cl.listProduct}>
                {data?.products?.map((product) =>
                    product?.link ? (
                        <ReclamItem key={product?.id} product={product} />
                    ) : (
                        <ProductItem key={product?._id} product={product} />
                    )
                )}

                {/* <CustomPagination
                            resPerPage={data?.resPerPage}
                            productsCount={data?.filteredProductsCount}
                        /> */}
            </main>
        </>
    );
};

export default ListProducts;
