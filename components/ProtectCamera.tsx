"use client"

import { useEffect, useRef, useState } from "react"
import CameraFeed, { CameraFeedHandle } from "./CameraFeed"
import { useTestSetup } from "@/app/hooks/useTestSetup"

export default function ProctoredCamera() {
  const { handleShareVideo, videoStreamRef } = useTestSetup();
  const cameraRef = useRef<CameraFeedHandle>(null)

  useEffect(() => {
    handleShareVideo()
  }, [])

  if (!videoStreamRef || !videoStreamRef.current) return null

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      <CameraFeed
        ref={cameraRef}
        videoStream={videoStreamRef.current!}
      />
    </div>
  )
}
