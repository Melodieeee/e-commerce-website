import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BulkDiscount from "../../../lib/models/schemas/BulkDiscountSchema";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const bulkDiscounts = await BulkDiscount.find();
        return NextResponse.json({ message: bulkDiscounts}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
   
}

export async function POST(request: Request) {
    //const requestData = await request.json();
    //console.log('request is ', requestData['name']);

    const requestData = await request.formData();
    try {
        await dbConnect();
        
        const bulkDiscount = await BulkDiscount.create({
            quantity: requestData.get('quantity'),
            percentageOff:requestData.get('percentageOff')
        })

        console.log('request is ,', request);
        return NextResponse.json({ message: "created!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
