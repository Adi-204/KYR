"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

// Global stream tracking to ensure all streams are cleaned up
const globalStreams = new Set<MediaStream>()

export function useTestSetup() {
  const router = useRouter()
  const [cameraShared, setCameraShared] = useState(false)
  const [screenShared, setScreenShared] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Use refs to track streams since we need current values in cleanup
  const videoStreamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  // Helper function to stop and remove stream from global tracking
  const stopStream = useCallback((stream: MediaStream | null) => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop()
      })
      globalStreams.delete(stream)
    }
  }, [])

  // Helper function to add stream to global tracking
  const addStreamToGlobal = useCallback((stream: MediaStream) => {
    globalStreams.add(stream)
  }, [])

  // Global cleanup function that stops ALL streams
  const cleanupAllMedia = useCallback(() => {
    globalStreams.forEach(stream => {
      stopStream(stream)
    })
    globalStreams.clear()
    
    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
    }

    // Reset local refs
    videoStreamRef.current = null
    screenStreamRef.current = null
    
    // Reset state
    setCameraShared(false)
    setScreenShared(false)
    setIsFullscreen(false)
  }, [stopStream])

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else if (document.exitFullscreen) {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  // Handle page unload/close
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("Page unloading, cleaning up all media")
      cleanupAllMedia()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [cleanupAllMedia])

  const handleShareVideo = useCallback(async () => {
    try {
      // Stop existing stream if any
      if (videoStreamRef.current) {
        stopStream(videoStreamRef.current)
        videoStreamRef.current = null
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }, 
        audio: true 
      })
      
      videoStreamRef.current = stream
      addStreamToGlobal(stream)
      
      stream.getTracks().forEach(track => {
        track.onended = () => {
          setCameraShared(false)
          videoStreamRef.current = null
          globalStreams.delete(stream)
        }
      })
      setCameraShared(true)
    } catch (error) {
      console.error("Camera error:", error)
      setCameraShared(false)
      videoStreamRef.current = null
    }
  }, [addStreamToGlobal, stopStream])

  const handleShareScreen = async () => {
    try {
      if (screenStreamRef.current) {
        stopStream(screenStreamRef.current)
        screenStreamRef.current = null
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenStreamRef.current = stream
      addStreamToGlobal(stream)
      
      stream.getTracks().forEach(track => {
        track.onended = () => {
          console.log("Screen track ended")
          setScreenShared(false)
          screenStreamRef.current = null
          globalStreams.delete(stream)
        }
      })
      setScreenShared(true)
    } catch (error) {
      console.error("Screen share error:", error)
      setScreenShared(false)
      screenStreamRef.current = null
    }
  }

  // Resume upload
  const uploadResume = async () => {
    if (!resumeFile) return
    try {
      const formData = new FormData()
      formData.append("file", resumeFile)
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Upload failed")
      return await response.json()
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("Failed to upload resume")
      throw error
    }
  }

  // Cleanup function
  const cleanupMedia = async () => {
    console.log("Cleaning up media...")
    try {
      // Stop all video tracks
      if (videoStreamRef.current) {
        console.log("Stopping video stream tracks")
        stopStream(videoStreamRef.current)
        videoStreamRef.current = null
      }

      // Stop all screen share tracks
      if (screenStreamRef.current) {
        console.log("Stopping screen share tracks")
        stopStream(screenStreamRef.current)
        screenStreamRef.current = null
      }

      // Exit fullscreen if active
      if (document.fullscreenElement) {
        console.log("Exiting fullscreen")
        await document.exitFullscreen()
      }

      // Update state
      setCameraShared(false)
      setScreenShared(false)
      setIsFullscreen(false)

      console.log("Cleanup complete")
    } catch (error) {
      console.error("Cleanup error:", error)
    }
  }

  return {
    cameraShared,
    screenShared,
    resumeFile,
    uploadError,
    isFullscreen,
    setResumeFile,
    setUploadError,
    toggleFullscreen,
    handleShareVideo,
    handleShareScreen,
    uploadResume,
    cleanupMedia,
    cleanupAllMedia,
    videoStreamRef,
    screenStreamRef,
    router
  }
}

