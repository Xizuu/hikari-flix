'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import {Eye} from 'lucide-react'
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Footer from "@/components/footer";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import Navbar from "@/components/navbar";
import {encodeWatchId} from "@/lib/utils";

interface AnimeProps {
    title: string;
    slug: string;
    image: string;
    type: string;
    episode: string;
    status: string;
}

function EpisodeSelector({ anime, animeSlug }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            const response = await fetch(`/api/anime/${animeSlug}`);
            const result = await response.json();
            setEpisodes(result.data.episodes);
        };

        fetchEpisodes().then(() => setIsLoading(false));
    }, [animeSlug]);

    return isLoading ? (
        <LoadingSpinner />
    ) : (
        <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 overflow-y-auto"
            style={{ maxHeight: "400px", padding: "10px" }}
        >
            {episodes.map((episode, index) => (
                <Button
                    key={index}
                    className="w-full text-left truncate"
                    variant="outline"
                    onClick={() => {
                        const encodedEpisodeId = encodeWatchId(`${anime}?episode=${episode.slug}`)
                        router.push(`/watch/${encodedEpisodeId}`)
                    }}
                >
                    {episode.episode}
                </Button>
            ))}
        </div>
    );
}

export default function GenrePage() {
    const { genre } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasNext, setHasNext] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAnime, setFilteredAnime] = useState<AnimeProps[]>([]);

    useEffect(() => {
        setIsLoading(true)
        const fetchAnimesByGenre = async () => {
            const response = await fetch(`/api/animes?genre=${genre}&page=${currentPage}`)
            const result = await response.json()
            setFilteredAnime(result.data)
            setHasNext(result.hasNext)
        }
        fetchAnimesByGenre()
            .then(() => setIsLoading(false))
    }, [genre, currentPage]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                
                {/*<h1>{genre} Anime</h1>*/}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredAnime.map((index) => (
                        <Card key={index.slug} className="flex flex-col overflow-hidden">
                            <CardHeader className="p-0">
                                <div className="relative aspect-[3/4]">
                                    <Image
                                        src={index.image || "/placeholder.svg"}
                                        alt={index.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                        draggable={false}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow p-4">
                                <CardTitle className="text-lg mb-2 line-clamp-1">{index.title}</CardTitle>
                                {/*<p className="text-sm text-gray-600 dark:text-gray-400">Episodes: {anime.episodes}</p>*/}
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <Eye className="w-4 h-4 mr-2" /> Watch Now
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Select Episode</DialogTitle>
                                        </DialogHeader>
                                        <EpisodeSelector
                                            anime={index.title}
                                            animeSlug={index.slug}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(prev => Math.max(prev - 1, 1));
                                }}
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            {currentPage}
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(prev => Math.min(prev + 1));
                                }}
                                className={!hasNext ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </main>

            <Footer />
        </div>
    )
}

