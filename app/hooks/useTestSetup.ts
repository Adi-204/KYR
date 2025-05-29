"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

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


  const handleShareVideo = async () => {
    try {
      // Stop existing stream if any
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach(track => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      videoStreamRef.current = stream
      stream.getTracks().forEach(track => {
        track.onended = () => {
          setCameraShared(false)
          videoStreamRef.current = null
        }
      })
      setCameraShared(true)
    } catch (error) {
      console.error("Camera error:", error)
      setCameraShared(false)
      videoStreamRef.current = null
    }
  }

  const handleShareScreen = async () => {
    try {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop())
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenStreamRef.current = stream
      stream.getTracks().forEach(track => {
        track.onended = () => {
          setScreenShared(false)
          screenStreamRef.current = null
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
      console.log("Outside : ", videoStreamRef.current);
      if (videoStreamRef.current) {
        console.log("Stopping video stream")
        videoStreamRef.current.getTracks().forEach(track => track.stop())
        videoStreamRef.current = null
      }

      if (screenStreamRef.current) {
        console.log("Stopping screen share")
        screenStreamRef.current.getTracks().forEach(track => track.stop())
        screenStreamRef.current = null
      }

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
    videoStreamRef,
    screenStreamRef,
    router
  }
}

