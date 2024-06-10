import React from "react";
import axios from "axios";

import UpdateAds from "@/components/admin/(Ads)/UpdateAds";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const UpdateAdsPage = async ({ params }) => {
    const { data } = await axios.get(
        `${process.env.API_URL}/api/ads/${params?.id}`
    );
    return <UpdateAds data={data.ads} />;
};

export default UpdateAdsPage;
