'use client';

import {
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
    useCallback
} from 'react';

export interface CameraFeedHandle {
    stopCamera: () => void;
}

interface CameraFeedProps {
    videoStream: MediaStream;
    onStopCamera?: () => void;
}

const CameraFeed = forwardRef<CameraFeedHandle, CameraFeedProps>(({ videoStream, onStopCamera }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const stopCamera = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }
        onStopCamera?.();
    };

    useImperativeHandle(ref, () => ({
        stopCamera,
    }));

    useEffect(() => {
        if (videoRef.current && videoStream) {
            videoRef.current.srcObject = videoStream;
            videoRef.current.play().catch((err) => {
                console.warn('Autoplay failed:', err);
            });
            
            return () => {
                if(videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.srcObject = null;
                }
            };
        }
    }, [videoStream]);

    // Use useCallback to memoize the handlers
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    }, [position.x, position.y]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    }, [dragging]);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]); 

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                width: '200px',
                height: '150px',
                cursor: dragging ? 'grabbing' : 'grab',
                zIndex: 1000,
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    border: '2px solid black',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    backgroundColor: '#000',
                }}
            />
        </div>
    );
});

export default CameraFeed;