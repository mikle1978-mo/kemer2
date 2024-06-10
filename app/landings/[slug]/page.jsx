import axios from "axios";
import AdsDetails from "@/components/landings/AdsDetails";
import { cache } from "react";

export async function generateMetadata({ params }) {
    const ads = await getAdsDetails(params?.slug);
    return {
        title: `${ads.name} `,
        description: `${ads.advertiser}. ${ads.description}`,
    };
}

export async function generateStaticParams() {
    const { data } = await axios.get(`${process.env.API_URL}/api/ads`);

    return data.allAds.map(({ _id }) => _id);
}

const getAdsDetails = cache(async (slug) => {
    const { data } = await axios.get(`${process.env.API_URL}/api/ads/${slug}`);
    return data?.ads;
});

const ProductAdsPage = async ({ params }) => {
    const ads = await getAdsDetails(params?.slug);

    return <AdsDetails ads={ads} />;
};

export default ProductAdsPage;
