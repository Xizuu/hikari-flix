import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoProps {
    videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current as Element, {
                controls: true,
                autoplay: true,
                muted: true,
                preload: 'auto',
            });

            player.src({
                src: videoUrl
            });

            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [videoUrl]);

    return (
        <div>
            <video
                ref={videoRef}
                className="video-js vjs-default-skin"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
}
