"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext);
  const router = useRouter()

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  useEffect(() => {
    router.refresh()
  }, []);

  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} Orders
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID
            </th>
            <th scope="col" className="px-4 py-3">
              Date
            </th>
            <th scope="col" className="px-4 py-3">
              User name
            </th>
            <th scope="col" className="px-4 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="px-4 py-2">{order?._id}</td>
              <td className="px-4 py-2">{new Date(order?.createAt).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}</td>
              <td className="px-4 py-2">{order?.user.name}</td>
              <td className="px-4 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td className="px-4 py-2">{order?.orderStatus}</td>
              <td className="px-4 py-2">
                <div className="flex flex-nowrap">
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Link>
                  <a
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => deleteHandler(order?._id)}
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
          resPerPage={orders?.resPerPage}
          productsCount={orders?.ordersCount}
        />
      </div>
    </div>
  );
};

export default Orders;
