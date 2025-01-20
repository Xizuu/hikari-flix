import { NextRequest, NextResponse } from "next/server";
import { animasu } from "yaoi";

export async function GET(request: NextRequest, { params }: { params: { watchId: string } }) {
    try {
        const { watchId } = params;

        // const anime = await animasu.getAnime(slug)
        const streams = await animasu.getStreams(watchId)

        if (streams.length === 0) {
            return NextResponse.json({
                status: false,
                message: "Anime not found"
            })
        }

        return NextResponse.json({
            status: true,
            data: streams,
        });
    } catch (error: Error) {
        return NextResponse.json({
            status: false,
            message: error.message || "An error occurred",
        });
    }
}
