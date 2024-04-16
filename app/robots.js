export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api", "/me"],
        },
        sitemap: `${process.env.API_URL}/sitemap.xml`,
    };
}
