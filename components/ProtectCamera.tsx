"use client"

import { useEffect, useRef, useState } from "react"
import CameraFeed, { CameraFeedHandle } from "./CameraFeed"

export default function ProctoredCamera() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const cameraRef = useRef<CameraFeedHandle>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        setVideoStream(stream)
      } catch (error) {
        console.error("Camera access error:", error)
      }
    }

    initCamera()

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stopCamera()
      }
    }
  }, [])

  if (!videoStream) return null

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      <CameraFeed 
        ref={cameraRef}
        videoStream={videoStream}
      />
    </div>
  )
}
