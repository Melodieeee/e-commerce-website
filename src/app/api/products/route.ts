import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/schemas/ProductSchema";

export async function GET(request: Request, context:any) {
    try {
        await dbConnect();
        /*
        const bulkDiscount = await BulkDiscount.create({
            quantity:10,
            percentageOff:10
        })*/

        const { params } = context;
        console.log('request is ,', request);
        console.log('context is, ', params);
        return NextResponse.json({ message: "created!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
   
}

// export async function POST(request: Request) {
//     //const requestData = await request.json();
//     //console.log('request is ', requestData['name']);

//     const requestData = await request.formData();
//     const product = await Product.create({
//         sku: requestData.get('sku'),
//         defaultCategoryIds: requestData.get('defaultCategoryIds'),
//         categoryIds: requestData.get('categoryIds'),
//         productName: requestData.get('productName'),
//         productCoverPic: requestData.get('productCoverPic'),
//         productPics: requestData.get('productPics'),
//         description: requestData.get('description'),
//         attributes: requestData.get('attributes'),
//         minSelection: requestData.get('minSelection'),
//         bulkDiscounts: requestData.get('bulkDiscounts'),
//         promoPercentageOff: requestData.get('promoPercentageOff'),
//         isUploadFiles: requestData.get('isUploadFiles')
//     });
//     console.log('request is ', requestData.get('name'));

//     return NextResponse.json({ message: "POST data!" });
// }

export async function POST(request: Request) {
    const requestData = await request.formData();
    const attributes = JSON.parse(requestData.get('attributes') as string || '[]');
    const bulkDiscounts = JSON.parse(requestData.get('bulkDiscounts') as string || '[]');
    const minSelection = JSON.parse(requestData.get('minSelection') as string || '[]');

    try {
        const product = await Product.create({
            sku: requestData.get('sku'),
            defaultCategoryIds: requestData.get('defaultCategoryIds'),
            categoryIds: requestData.get('categoryIds'),
            productName: requestData.get('productName'),
            productCoverPic: requestData.get('productCoverPic'),
            productPics: JSON.parse(requestData.get('productPics') as string || '[]'),
            description: requestData.get('description'),
            attributes: attributes,
            minSelection: minSelection,
            bulkDiscounts: bulkDiscounts,
            promoPercentageOff: Number(requestData.get('promoPercentageOff')),
            isUploadFiles: requestData.get('isUploadFiles') === 'true',
        });

        return NextResponse.json({ message: "Product created!", product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
