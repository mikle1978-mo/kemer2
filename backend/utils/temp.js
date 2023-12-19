import path from "path";
import fs from "fs/promises"; // использование fs/promises для промисификации

// ...

export const uploadProductImages = async (req, id, next) => {
    let product = await Product.findById(id);

    // const body = await req.formData();
    // const file = body.get("image");
    const formData = await req.formData();

    // Remember to enforce type here and after use some lib like zod.js to check it
    const files = formData.getAll("image");
    // const files = formData.files;
    // const filePaths = files.map((file) => file.path);
    const filePaths = files.map((file) => file.path);

    // Thats it, you have your files
    console.log("..............1", formData);
    console.log("..............2", files);
    console.log("..............3", filePaths);

    // console.log("body+++++++++++++++", body);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    const uploader = async (destinationDirPath) =>
        await uploads(destinationDirPath, "ecomm/products");

    const urls = [];
    // const files = body;

    for (const file of files) {
        console.log("file:   ===", file);
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = new Uint8Array(arrayBuffer);
        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes);
        // const path = join(`${process.env.API_URL}/tmp/${file.name}`);
        // await writeFile(path, buffer);

        // const path = `/public/images/uploads/${file.name}`;
        // const path = file;

        const destinationDirPath = path.join(
            process.cwd(),
            "public/images/uploads",
            file.name
        );
        console.log(destinationDirPath);

        console.log("path_________________:  ", destinationDirPath);
        const imgUrl = await uploader(destinationDirPath);
        console.log(imgUrl);
        urls.push(imgUrl);
        fs.unlinkSync(destinationDirPath);
    }

    product = await Product.findByIdAndUpdate(id, {
        images: urls,
    });

    return {
        data: urls,
        product,
    };
};
