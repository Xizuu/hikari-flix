import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ videoUrl }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, {
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
