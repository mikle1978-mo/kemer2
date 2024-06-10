import axios from "axios";
import React from "react";
import { cookies } from "next/headers";

import UpdateOrder from "@/components/admin/(Orders)/UpdateOrder";
import { getCookieName } from "@/helpers/helpers";

const AdminOrderDetailsPage = async ({ params }) => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const { data } = await axios.get(
        `${process.env.API_URL}/api/orders/${params?.id}`,
        {
            headers: {
                Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
            },
        }
    );

    return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailsPage;
