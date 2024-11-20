// src/app/api/product/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const products = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 200 },
    ];
    return NextResponse.json(products);
}
