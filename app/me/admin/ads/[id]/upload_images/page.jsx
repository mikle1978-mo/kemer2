import React from "react";
import UploadImages from "@/components/admin/(Ads)/UploadImages";

const UploadAdsImagePage = async ({ params }) => {
    return <UploadImages id={params.id} />;
};

export default UploadAdsImagePage;
