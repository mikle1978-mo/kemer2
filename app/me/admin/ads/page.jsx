import axios from "axios";
import AdsList from "@/components/admin/(Ads)/AdsList";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/helpers";

const AdminAdsPage = async () => {
    const nextCookies = cookies();
    const cookieName = getCookieName();
    const nextAuthSessionToken = nextCookies.get(cookieName);

    const { data } = await axios.get(`${process.env.API_URL}/api/admin/ads`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        },
    });

    return <AdsList data={data} />;
};

export default AdminAdsPage;
