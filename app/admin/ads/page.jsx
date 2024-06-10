import axios from "axios";
import AdsList from "@/components/admin/(Ads)/AdsList";
import { dbConnect } from "@/backend/config/dbConnect";

const AdminAdsPage = async () => {
    dbConnect();
    const apiURl = `${process.env.API_URL}/api/admin/ads`;
    const { data } = await axios.get(apiURl);
    return <AdsList data={data} />;
};

export default AdminAdsPage;
