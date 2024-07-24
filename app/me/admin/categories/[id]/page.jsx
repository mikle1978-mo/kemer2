import React from "react";
import axios from "axios";
import UpdateCategory from "@/components/admin/(Categories)/UpdateCategory";

const UpdateCategoryPage = async ({ params }) => {
    const { data } = await axios.get(`${process.env.API_URL}/api/categories`);

    let category = data.categories.find((item) => item._id == params?.id);

    return <UpdateCategory item={category} data={data} />;
};

export default UpdateCategoryPage;
