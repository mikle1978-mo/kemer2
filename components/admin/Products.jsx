"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import ProductContext from "@/context/ProductContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faImage } from '@fortawesome/free-solid-svg-icons';
import { mark } from "@/lib/const/const";

const Products = ({ data }) => {
  const { deleteProduct, error, clearErrors } = useContext(ProductContext);
  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteProduct(id);
    router.refresh()
    toast.success("Продукт удален");
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.productsCount} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-3 py-3">
              Name
            </th>
            <th scope="col" className="px-3 py-3">
              St
            </th>
            <th scope="col" className="px-3 py-3">
              Pr
            </th>
            <th scope="col" className="px-3 py-3">
              Cat
            </th>
            <th scope="col" className="px-3 py-3">
              Act
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr
              key={product._id}
              className="bg-white">
              <td className="px-2 py-2">{product?.name}</td>
              <td className="px-2 py-2">{product?.stock}</td>
              <td className="px-2 py-2">{mark}{product?.price}</td>
              <td className="px-2 py-2">{product?.category}</td>
              <td className="px-2 py-2">
                <div className="flex flex-nowrap">
                  <Link
                    href={`/admin/products/${product?._id}/upload_images`}
                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faImage} />
                  </Link>

                  <Link
                    href={`/admin/products/${product?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => deleteHandler(product?._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <CustomPagination
          resPerPage={data?.resPerPage}
          productsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default Products;
