
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BulkDiscount from "../../../../lib/models/schemas/BulkDiscountSchema";
import { useParams } from "next/navigation";



export async function GET(request: Request,{ params }: { params: { bulkDiscountId: string } }) {
    const bulkDiscountId = params.bulkDiscountId;
    console.log('id = ', bulkDiscountId);
    try {
        await dbConnect();
        const bulkDiscount = await BulkDiscount.findById(bulkDiscountId).exec();
        return NextResponse.json({ message: bulkDiscount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

}

export async function DELETE(request: Request, { params }: { params: { bulkDiscountId: string } }) {
    const bulkDiscountId = params.bulkDiscountId;
    try {
        await dbConnect();
        const bulkDiscount = await BulkDiscount.findById(bulkDiscountId).exec();
        bulkDiscount.Remove()
        return NextResponse.json({ message: bulkDiscount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}

export async function PUT(request: Request, { params }: { params: { bulkDiscountId: string } }) {
    const bulkDiscountId = params.bulkDiscountId;

    try {
        await dbConnect();
        const bulkDiscount = await BulkDiscount.findById(bulkDiscountId).exec();
        
        return NextResponse.json({ message: bulkDiscount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
} 