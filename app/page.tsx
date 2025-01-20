'use client'

import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {genreList} from "@/lib/genre-list";

export default function Home() {

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />

        <main>
          <section className="relative h-[60vh] md:h-[80vh]">
            <Image
                src="/hero.jpg"
                alt="HikariFlix Official"
                layout="fill"
                objectFit="cover"
                className="brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-3xl px-4">
                <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">HikariFlix</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">From Shonen to Slice of Life, All Your Anime in One Place!</p>
                <Link href={`/#genres`}>
                  <Button size="lg" className="mr-4">
                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section id="genres" className="py-6 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-white">Our Genres</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {genreList.map((index) => (
                    <Link key={index.slug} href={`/genres/${index.slug.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button variant="outline" className="text-base md:text-lg py-4 md:py-6 w-full">
                        {index.name}
                      </Button>
                    </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
  )
}

