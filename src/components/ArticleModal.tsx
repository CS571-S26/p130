import { useEffect, useRef } from 'react'
import type { Article } from '../data/articles'

type Props = {
  article: Article | null
  onClose: () => void
}

const FOCUSABLE =
  'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),a[href]'

export default function ArticleModal({ article, onClose }: Props) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus trap: active only while an article is open
    if (!article || !innerRef.current) return

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
  }, [article, onClose])

  if (!article) return null

  return (
    // Clicking the overlay dismisses the modal
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      // aria-labelledby ties the dialog name to its visible heading for screen readers
      aria-labelledby="article-modal-title"
    >
      <div
        className="modal-inner"
        ref={innerRef}
        onClick={e => e.stopPropagation()}
      >

        {/* type="button" prevents accidental form submission */}
        <button type="button" className="modal-close" onClick={onClose} aria-label="إغلاق">×</button>

        {/* Tags */}
        <div className="modal-tags">
          {article.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
        </div>

        {/* Header — id matches aria-labelledby on the dialog */}
        <h2 id="article-modal-title" className="modal-title">{article.title}</h2>
        <p className="modal-date">{article.date}</p>

        {/* Images: meaningful alt text — empty alt="" was wrong for content images */}
        {article.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? article.title : `${article.title} — صورة ${i + 1}`}
            className="modal-img"
          />
        ))}

        {/* Body text */}
        <p className="modal-body">{article.body}</p>
      </div>
    </div>
  )
}
