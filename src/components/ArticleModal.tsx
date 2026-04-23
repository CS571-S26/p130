import type { Article } from '../data/articles'

type Props = {
  article: Article | null
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: Props) {
  if (!article) return null

  return (
    // Clicking the overlay dismisses the modal
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal>
      <div className="modal-inner" onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">×</button>

        {/* Tags */}
        <div className="modal-tags">
          {article.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>

        {/* Header */}
        <h2 className="modal-title">{article.title}</h2>
        <p className="modal-date">{article.date}</p>

        {/* Images */}
        {article.images.map((src, i) => (
          <img key={i} src={src} alt="" className="modal-img" />
        ))}

        {/* Body text */}
        <p className="modal-body">{article.body}</p>
      </div>
    </div>
  )
}
