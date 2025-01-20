import { NextRequest, NextResponse } from "next/server";
import { animasu } from "yaoi";

export async function GET(request: NextRequest) {
    try {

        const genre = request.nextUrl.searchParams.get("genre");
        const page = request.nextUrl.searchParams.get("page") || "1";

        if (!genre) {
            return NextResponse.json({
                status: false,
                message: "Invalid genre"
            })
        }

        const animes = await animasu.getAnimes({
            genres: [genre],
            page: parseInt(page, 10),
            sort: "update",
        });

        return NextResponse.json({
            status: true,
            data: animes.data,
            hasNext: animes.hasNext,
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
