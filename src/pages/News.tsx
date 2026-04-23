import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { articles } from '../data/articles'
import type { Article } from '../data/articles'
import NewsCard from '../components/NewsCard'
import ArticleModal from '../components/ArticleModal'
import './News.css'

// All unique tags across articles, with "الكل" (All) prepended
const allTags = ['الكل', ...Array.from(new Set(articles.flatMap(a => a.tags)))]

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [activeTag, setActiveTag] = useState('الكل')

  const filtered =
    activeTag === 'الكل' ? articles : articles.filter(a => a.tags.includes(activeTag))

  const [featured, ...rest] = filtered

  return (
    <div className="news-page">
      <Container className="py-5">

        {/* Page heading with gold underline */}
        <h1 className="news-heading">المجلة</h1>

        {/* Tag filter pills */}
        <div className="tag-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-btn${activeTag === tag ? ' tag-btn--active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Featured article — full-width, taller image */}
        {featured && (
          <NewsCard article={featured} featured onClick={() => setSelectedArticle(featured)} />
        )}

        {/* Remaining articles — 3-column grid */}
        {rest.length > 0 && (
          <div className="articles-grid">
            {rest.map(a => (
              <NewsCard key={a.id} article={a} onClick={() => setSelectedArticle(a)} />
            ))}
          </div>
        )}

        {/* Full-article modal */}
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />

      </Container>
    </div>
  )
}
