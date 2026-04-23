import type { Video } from '../data/videos'

type Props = {
  video: Video | null
  onClose: () => void
}

export default function VideoModal({ video, onClose }: Props) {
  if (!video) return null

  return (
    // Clicking the overlay dismisses the modal
    <div className="vmodal-overlay" onClick={onClose} role="dialog" aria-modal>
      <div className="vmodal-inner" onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button className="vmodal-close" onClick={onClose} aria-label="إغلاق">×</button>

        {/* Embedded YouTube player with autoplay */}
        <iframe
          className="vmodal-iframe"
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        {/* Video metadata */}
        <h2 className="vmodal-title">{video.title}</h2>
        <p className="vmodal-date">{video.date}</p>
        <p className="vmodal-desc">{video.description}</p>
      </div>
    </div>
  )
}
