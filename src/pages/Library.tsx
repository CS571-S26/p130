import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { videos } from '../data/videos'
import type { Video } from '../data/videos'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'
import './Library.css'

// All unique tags across videos, with "الكل" (All) prepended
const allTags = ['الكل', ...Array.from(new Set(videos.flatMap(v => v.tags)))]

export default function Library() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeTag, setActiveTag] = useState('الكل')

  const filtered =
    activeTag === 'الكل' ? videos : videos.filter(v => v.tags.includes(activeTag))

  return (
    <div className="library-page">
      <Container className="py-5">

        {/* Page heading with gold underline */}
        <h1 className="library-heading">المكتبة الإلكترونية</h1>

        {/* Tag filter pills */}
        <div className="lib-tag-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`lib-tag-btn${activeTag === tag ? ' lib-tag-btn--active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Videos grid — 3 columns, 1 on mobile */}
        <div className="videos-grid">
          {filtered.map(v => (
            <VideoCard key={v.id} video={v} onClick={() => setSelectedVideo(v)} />
          ))}
        </div>

        {/* Full video modal */}
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />

      </Container>
    </div>
  )
}
