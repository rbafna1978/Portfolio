"use client"

import React, { useRef, useEffect } from "react"

interface NoiseCanvasProps {
  opacity?: number
  className?: string
}

export const NoiseCanvas: React.FC<NoiseCanvasProps> = ({
  opacity = 0.03,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let frameCount = 0
    const noiseFrames: ImageData[] = []
    const FRAME_COUNT = 10 // Pre-generate 10 frames

    const resize = () => {
      // Use lower resolution for performance
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width / 4
      canvas.height = rect.height / 4
      
      // Clear and pre-generate frames on resize
      noiseFrames.length = 0
      for (let f = 0; f < FRAME_COUNT; f++) {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.floor(Math.random() * 255)
          data[i] = value
          data[i + 1] = value
          data[i + 2] = value
          data[i + 3] = 255
        }
        noiseFrames.push(imageData)
      }
    }

    const generateNoise = () => {
      frameCount++
      // Update every 4 frames for even better performance
      if (frameCount % 4 !== 0) {
        animationId = requestAnimationFrame(generateNoise)
        return
      }

      const frameIndex = (frameCount / 4) % FRAME_COUNT
      if (noiseFrames[frameIndex]) {
        ctx.putImageData(noiseFrames[frameIndex], 0, 0)
      }
      
      animationId = requestAnimationFrame(generateNoise)
    }

    resize()
    generateNoise()

    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        opacity,
        mixBlendMode: "overlay",
        imageRendering: "pixelated",
      }}
    />
  )
}

export default NoiseCanvas
