import { useEffect, useRef } from 'react'
import type { Video } from '../data/videos'

type Props = {
  video: Video | null
  onClose: () => void
}

const FOCUSABLE =
  'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),a[href]'

export default function VideoModal({ video, onClose }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus trap: active only while a video is open
    if (!video || !innerRef.current) return

    // Remember opener so focus returns to it on close
    const trigger = document.activeElement as HTMLElement
    const el = innerRef.current
    const nodes = (): HTMLElement[] =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))

    nodes()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const list = nodes()
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      trigger?.focus() // restore focus to the element that opened the modal
    }
  }, [video, onClose])

  if (!video) return null

  return (
    // Clicking the overlay dismisses the modal
    <div
      className="vmodal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      // aria-labelledby ties the dialog name to its visible heading for screen readers
      aria-labelledby="video-modal-title"
    >
      <div
        className="vmodal-inner"
        ref={innerRef}
        onClick={e => e.stopPropagation()}
      >

        {/* type="button" prevents accidental form submission */}
        <button type="button" className="vmodal-close" onClick={onClose} aria-label="إغلاق">×</button>

        {/* Embedded YouTube player with autoplay */}
        <iframe
          className="vmodal-iframe"
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* id matches aria-labelledby on the dialog */}
        <h2 id="video-modal-title" className="vmodal-title">{video.title}</h2>
        <p className="vmodal-date">{video.date}</p>
        <p className="vmodal-desc">{video.description}</p>
      </div>
    </div>
  )
}
