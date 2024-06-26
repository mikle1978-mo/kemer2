import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import ListOrders from "@/components/orders/ListOrders";
import queryString from "query-string";
import { getCookieName } from "@/helpers/helpers";

const MyOrdersPage = async ({ searchParams }) => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const { data } = await axios.get(`${process.env.API_URL}/api/orders/me`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
    });

    return <ListOrders orders={data} />;
};

export default MyOrdersPage;
