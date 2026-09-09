'use client'
import type { JSX } from 'react'
import { useEffect, useRef, useState } from 'react'

type Frame = ImageBitmap | HTMLCanvasElement

const MAX_CAPTURE_WIDTH = 960
const PLAYBACK_INTERVAL = 1000 / 30

export function BoomerangVideo({
  src,
  reduced,
}: {
  src: string
  reduced: boolean
}): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<Frame[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    let stopped = false
    let rafId: number | null = null
    let rvfcId: number | null = null
    let intervalId: ReturnType<typeof setInterval> | null = null
    let lastCapturedTime = -1

    const offscreen =
      typeof document !== 'undefined'
        ? document.createElement('canvas')
        : null
    const offCtx = offscreen ? offscreen.getContext('2d') : null

    const captureFrame = (): void => {
      if (stopped || !offscreen || !offCtx) return
      if (video.readyState < 2) return
      const t = video.currentTime
      if (t === lastCapturedTime) return
      lastCapturedTime = t

      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return
      const scale = vw > MAX_CAPTURE_WIDTH ? MAX_CAPTURE_WIDTH / vw : 1
      const w = Math.max(1, Math.round(vw * scale))
      const h = Math.max(1, Math.round(vh * scale))
      offscreen.width = w
      offscreen.height = h
      try {
        offCtx.drawImage(video, 0, 0, w, h)
      } catch {
        return
      }

      const frameCanvas = document.createElement('canvas')
      frameCanvas.width = w
      frameCanvas.height = h
      const frameCtx = frameCanvas.getContext('2d')
      if (!frameCtx) return
      frameCtx.drawImage(offscreen, 0, 0)
      framesRef.current.push(frameCanvas)
    }

    const scheduleNext = (): void => {
      if (stopped) return
      if (typeof video.requestVideoFrameCallback === 'function') {
        rvfcId = video.requestVideoFrameCallback(onFrame)
      } else {
        rafId = window.requestAnimationFrame(onFrame)
      }
    }

    const onFrame = (): void => {
      if (stopped) return
      captureFrame()
      if (!video.ended) scheduleNext()
    }

    const startPlayback = (): void => {
      const frames = framesRef.current
      if (frames.length === 0) {
        setReady(true)
        return
      }
      const ctx = canvas.getContext('2d')
      const first = frames[0]
      canvas.width = first.width
      canvas.height = first.height
      const draw = (frame: Frame): void => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        try {
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
        } catch {
          /* noop */
        }
      }

      setReady(true)

      if (reduced) {
        draw(first)
        return
      }

      let index = 0
      let direction = 1
      draw(frames[index])
      intervalId = setInterval(() => {
        if (stopped) return
        index += direction
        if (index >= frames.length - 1) {
          index = frames.length - 1
          direction = -1
        } else if (index <= 0) {
          index = 0
          direction = 1
        }
        draw(frames[index])
      }, PLAYBACK_INTERVAL)
    }

    const onEnded = (): void => {
      stopped = true
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (rvfcId !== null && typeof video.cancelVideoFrameCallback === 'function') {
        video.cancelVideoFrameCallback(rvfcId)
      }
      captureFrame()
      stopped = false
      startPlayback()
    }

    video.addEventListener('ended', onEnded)

    const playResult: unknown = video.play()
    if (
      playResult &&
      typeof (playResult as Promise<void>).catch === 'function'
    ) {
      ;(playResult as Promise<void>).catch(() => {
        /* autoplay blocked or unsupported (jsdom) */
      })
    }
    scheduleNext()

    return () => {
      stopped = true
      video.removeEventListener('ended', onEnded)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (rvfcId !== null && typeof video.cancelVideoFrameCallback === 'function') {
        video.cancelVideoFrameCallback(rvfcId)
      }
      if (intervalId !== null) clearInterval(intervalId)
      framesRef.current = []
    }
  }, [src, reduced])

  return (
    <div className="h-full w-full origin-top scale-[1.15] overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="h-full w-full object-cover object-top"
        style={{ display: ready ? 'none' : 'block' }}
      />
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover object-top"
        style={{ display: ready ? 'block' : 'none' }}
      />
    </div>
  )
}
