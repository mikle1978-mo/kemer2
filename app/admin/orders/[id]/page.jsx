import axios from "axios";
import React from "react";

import UpdateOrder from "@/components/admin/UpdateOrder";


const AdminOrderDetailsPage = async ({ params }) => {

  const { data } = await axios.get(`${process.env.API_URL}/api/orders/${params?.id}`);
  console.log("admin/orders/id: data", data);



  return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailsPage;
