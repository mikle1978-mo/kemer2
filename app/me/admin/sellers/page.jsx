import axios from "axios";
import Sellers from "@/components/admin/(Sellers)/Sellers";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const AdminSellersPage = async () => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);
    const apiUrl = `${process.env.API_URL}/api/admin/sellers`;

    const { data } = await axios.get(apiUrl, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
    });

    return <Sellers data={data} />;
};

export default AdminSellersPage;
