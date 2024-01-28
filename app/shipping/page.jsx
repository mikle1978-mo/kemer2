import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import Shipping from "@/components/cart/Shipping";
import { getCookieName } from "@/helpers/helpers";


const ShippingPage = async () => {

  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });

  return <Shipping addresses={data?.addresses} />;
};

export default ShippingPage;
