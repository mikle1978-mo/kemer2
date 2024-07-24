import React from "react";
import axios from "axios";

import UpdateSeller from "@/components/admin/(Sellers)/UpdateSeller";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const SellersAdminPage = async ({ params }) => {
    const isValidId = mongoose.isValidObjectId(params?.id);

    if (!isValidId) {
        return redirect("/");
    }
    const { data } = await axios.get(
        `${process.env.API_URL}/api/sellers/${params?.id}`
    );

    return <UpdateSeller data={data.seller} />;
};

export default SellersAdminPage;
