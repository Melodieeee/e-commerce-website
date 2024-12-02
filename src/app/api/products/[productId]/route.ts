import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "../../../../lib/models/schemas/ProductSchema";
import { useParams } from "next/navigation";



export async function GET(request: Request, context:any) {
    const { productId } = useParams<{ productId: string }>() || {
        productId: "",
      };
    try {
        await dbConnect();

        const product = await Product.findById(productId).exec();
        const { params } = context;
        console.log('request is ,', request);
        console.log('context is, ', params);
        return NextResponse.json({ message: "created!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

}

export async function DELETE(request: Request, context:any) {
    const { params } = context;
     
}

export async function PUT(request: Request, context:any) {
    const { params } = context;
     
} 