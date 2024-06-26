import axios from "axios";
import queryString from "query-string";
import Products from "@/components/admin/(Products)/Products";
import { dbConnect } from "@/backend/config/dbConnect";

const AdminProductsPage = async ({ searchParams }) => {
    dbConnect();
    const urlParams = {
        keyword: searchParams.keyword,
        page: searchParams.page,
        category: searchParams.category,
        "price[gte]": searchParams.min,
        "price[lte]": searchParams.max,
        "ratings[gte]": searchParams.ratings,
    };

    const searchQuery = queryString.stringify(urlParams);

    const apiUrl = `${process.env.API_URL}/api/admin/products?${searchQuery}`;

    const { data } = await axios.get(apiUrl);
    return <Products data={data} />;
};

export default AdminProductsPage;
