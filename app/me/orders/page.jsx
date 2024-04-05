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

    const urlParams = {
        page: searchParams.page || 1,
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(
        `${process.env.API_URL}/api/orders/me?${searchQuery}`,
        {
            headers: {
                Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
            },
        }
    );
    console.log("orders:  ", data.orders[0]);

    return <ListOrders orders={data} />;
};

export default MyOrdersPage;
