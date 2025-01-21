'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Share2 } from 'lucide-react'
import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {decodeWatchId} from "@/lib/utils";
import {LoadingSpinner} from "@/components/loading-spinner";

interface MovieProps {
    title: string;
    slug: string;
    url: string;
    synopsys: string;
}

export default function WatchPage() {
    const { id } = useParams()
    const searchParams = useSearchParams()
    const initialEpisode = searchParams.get('episode') || "1"
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<MovieProps>({
        title: "",
        slug: "",
        url: "",
        synopsys: ""
    })
    const [showFullDescription, setShowFullDescription] = useState(false)

    useEffect(() => {
        const fetchMovie = async() => {
            const watchId = decodeWatchId(decodeURIComponent(id as string))

            const readableWatchId = watchId.split("?");

            if (readableWatchId.length > 1) {
                const queryString = readableWatchId[1];
                const params = new URLSearchParams(queryString);

                // Fetch Movie
                const responseMovie = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stream/${params.get("episode")}`);
                const resultMovie = await responseMovie.json();

                // Fetch anime info
                const responseAnime = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anime/${readableWatchId[0]}`);
                const resultAnime = await responseAnime.json();

                setMovie({
                    title: readableWatchId[0].replace(/-/g, " "),
                    slug: params.get("episode") || "",
                    url: resultMovie.data[0].url,
                    synopsys: resultAnime.data.synopsis || ""
                });
            } else {
                console.error("Invalid watchId format:", watchId);
            }

        }

        fetchMovie()
            .then(() => setIsLoading(false))
    }, [initialEpisode, id])

    // if (!movieInfo.found) {
    //     return <div className="container mx-auto px-4 py-8">Anime not found</div>
    // }

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">{movie.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Card className="mb-8">
                            <CardContent className="p-0">
                                <div className="flex justify-center items-center mb-6">
                                    <iframe
                                        src={movie.url}
                                        className="w-full aspect-video rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                        allowFullScreen
                                        title="Video Player"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>About This Anime</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {showFullDescription
                                        ? movie.synopsys
                                        : `${movie.synopsys.slice(0, 150)}${movie.synopsys.length > 150 ? '...' : ''}`}
                                </p>
                                {movie.synopsys.length > 150 && (
                                    <Button
                                        variant="link"
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="mt-2 p-0"
                                    >
                                        {showFullDescription ? 'Hide' : 'Read more'}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex space-x-4 mb-6">
                            <Button className="flex-1">
                                <Heart className="mr-2 h-5 w-5" /> Add to Favorites
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Share2 className="mr-2 h-5 w-5" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

