import { NextRequest, NextResponse } from "next/server";
import { animasu } from "yaoi";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        const anime = await animasu.getAnime(slug)

        return NextResponse.json({
            status: true,
            data: anime
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                status: false,
                message: error.message || "An error occurred",
            });
        } else {
            return NextResponse.json({
                status: false,
                message: "An unknown error occurred",
            });
        }
    }

}
