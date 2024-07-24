import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/(Products)/Products";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const AdminProductsPage = async ({ searchParams }) => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const apiUrl = `${process.env.API_URL}/api/products`;

    const { data } = await axios.get(apiUrl, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
    });
    return <Products data={data} />;
};

export default AdminProductsPage;
