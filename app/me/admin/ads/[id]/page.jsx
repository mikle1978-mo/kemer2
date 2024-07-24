import React from "react";
import axios from "axios";
import UpdateAds from "@/components/admin/(Ads)/UpdateAds";

const UpdateAdsPage = async ({ params }) => {
    const { data } = await axios.get(
        `${process.env.API_URL}/api/admin/ads/${params?.id}`
    );
    return <UpdateAds data={data.ads} />;
};

export default UpdateAdsPage;
