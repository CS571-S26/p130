import type { Article } from '../data/articles'

type Props = {
  article: Article
  onClick: () => void
  featured?: boolean
}

export default function NewsCard({ article, onClick, featured = false }: Props) {
  return (
    <div
      className={`news-card${featured ? ' news-card--featured' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      {/* Preview image */}
      <img src={article.previewImage} alt={article.title} className="news-card__img" />

      <div className="news-card__body">
        {/* Tags row */}
        <div className="news-card__tags">
          {article.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>

        {/* Title and date */}
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__date">{article.date}</p>
      </div>
    </div>
  )
}
