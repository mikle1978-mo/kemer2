import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import UpdateAddress from "@/components/user/UpdateAddress";
import { getCookieName } from "@/helpers/helpers";


const UpdateAddressPage = async ({ params }) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address/${id}`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });

  return <UpdateAddress id={params?.id} address={data?.address} />;
};

export default UpdateAddressPage;
