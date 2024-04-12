import axios from "axios";
import React from "react";
import { cookies } from "next/headers";

import Orders from "@/components/admin/Orders";
import { getCookieName } from "@/helpers/helpers";

const AdminOrdersPage = async () => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const { data } = await axios.get(`${process.env.API_URL}/api/orders`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
    });

    return <Orders orders={data} />;
};

export default AdminOrdersPage;
