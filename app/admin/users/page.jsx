import axios from "axios";
import React from "react";

import { cookies } from "next/headers";
import queryString from "query-string";
import Users from "@/components/admin/(Users)/Users";

const getUsers = async (searchParams) => {
    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

    const searchQuery = queryString.stringify();

    const { data } = await axios.get(
        `${process.env.API_URL}/api/admin/users?${searchQuery}`,
        {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
            },
        }
    );

    return data;
};

const AdminUsersPage = async ({ searchParams }) => {
    const users = await getUsers(searchParams);

    return <Users data={users} />;
};

export default AdminUsersPage;
