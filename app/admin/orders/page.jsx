import axios from "axios";
import React from "react";

import Orders from "@/components/admin/Orders";

const AdminOrdersPage = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/api/orders`);

  return <Orders orders={data} />;
};

export default AdminOrdersPage;
