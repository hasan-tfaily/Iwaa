import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (city) where.city = { contains: city };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { notes: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const places = await prisma.place.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(places);
  } catch {
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, phone, city, capacity, location, price, notes, imageUrl } = body;

    if (!title || !phone || !city) {
      return NextResponse.json(
        { error: "Title, phone, and city are required" },
        { status: 400 }
      );
    }

    if (!phone.startsWith("961")) {
      return NextResponse.json(
        { error: "Phone number must start with 961" },
        { status: 400 }
      );
    }

    const place = await prisma.place.create({
      data: {
        title,
        phone,
        city,
        capacity: capacity || null,
        location: location || null,
        price: price || null,
        notes: notes || null,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(place, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create place" }, { status: 500 });
  }
}
