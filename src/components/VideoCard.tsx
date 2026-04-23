import type { Video } from '../data/videos'

type Props = {
  video: Video
  onClick: () => void
}

export default function VideoCard({ video, onClick }: Props) {
  // YouTube generates thumbnails at a predictable URL
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`

  return (
    <div className="vid-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>

      {/* Thumbnail with centered play overlay */}
      <div className="vid-card__thumb-wrap">
        <img src={thumbnail} alt={video.title} className="vid-card__thumb" />
        <span className="vid-card__play" aria-hidden="true">▷</span>
      </div>

      {/* Card body */}
      <div className="vid-card__body">
        <h3 className="vid-card__title">{video.title}</h3>
        <p className="vid-card__date">{video.date}</p>
      </div>
    </div>
  )
}
