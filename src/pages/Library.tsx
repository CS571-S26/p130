import { useState, useEffect, useRef, useCallback } from 'react'
import type { RefObject } from 'react'
import { Container } from 'react-bootstrap'
import { videos } from '../data/videos'
import type { Video } from '../data/videos'
import VideoCard from '../components/VideoCard'
import './Library.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Annotation = {
  timestamp: string
  note: string
  createdAt: string
}

type AnnotationsStore = Record<string, Annotation[]>

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS_KEY = 'jbz_annotations'

function loadStore(): AnnotationsStore {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as AnnotationsStore) : {}
  } catch {
    return {}
  }
}

function persistStore(store: AnnotationsStore): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store))
  } catch {
    /* quota or security error — fail silently */
  }
}

// ─── useAnnotations ───────────────────────────────────────────────────────────

function useAnnotations() {
  const [store, setStore] = useState<AnnotationsStore>(loadStore)

  const get = useCallback(
    (id: string): Annotation[] => store[id] ?? [],
    [store],
  )

  const set = useCallback((id: string, anns: Annotation[]): void => {
    setStore(prev => {
      const next = { ...prev }
      if (anns.length === 0) {
        delete next[id]
      } else {
        next[id] = anns
      }
      persistStore(next)
      return next
    })
  }, [])

  return { get, set, store }
}

// ─── PDF export (print window — zero dependencies) ────────────────────────────

function exportAllAsPdf(store: AnnotationsStore): void {
  const entries = Object.entries(store)
  if (entries.length === 0) return

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const sections = entries
    .map(([id, anns]) => {
      const video = videos.find(v => String(v.id) === id)
      const title = escape(video?.title ?? id)
      const rows = anns
        .map(a => {
          const tsPart = a.timestamp
            ? `<span class="ts">⏱ ${escape(a.timestamp)}</span>`
            : ''
          return `<div class="ann">${tsPart}<p class="note">${escape(a.note)}</p></div>`
        })
        .join('')
      return `<section><h2>${title}</h2>${rows}</section>`
    })
    .join('')

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8">
<title>ملاحظات المحاضرات</title>
<style>
  body{font-family:system-ui,sans-serif;direction:rtl;padding:2rem;color:#111;}
  h1{font-size:1.5rem;border-bottom:2px solid #c9a84c;padding-bottom:.5rem;margin-bottom:1.5rem;}
  section{margin-bottom:2rem;}
  h2{font-size:1.05rem;font-weight:bold;margin-bottom:.75rem;}
  .ann{margin-bottom:.6rem;padding:.5rem .75rem;border-right:3px solid #c9a84c;}
  .ts{font-size:.8rem;color:#777;font-family:monospace;display:block;margin-bottom:.2rem;}
  .note{margin:0;line-height:1.7;}
  @media print{body{padding:0;}}
</style>
</head>
<body>
<h1>ملاحظات المحاضرات</h1>
${sections}
</body>
</html>`

  const win = window.open('', '_blank')
  if (!win) return
  win.document.write(html)
  win.document.close()
  setTimeout(() => win.print(), 350)
}

// ─── Focus trap ───────────────────────────────────────────────────────────────

const FOCUSABLE =
  'button:not([disabled]),input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function useFocusTrap(
  ref: RefObject<HTMLDivElement | null>,
  active: boolean,
  onClose: () => void,
): void {
  useEffect(() => {
    if (!active || !ref.current) return
    const el = ref.current

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
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, ref, onClose])
}

// ─── AnnotationRow ────────────────────────────────────────────────────────────

type AnnotationRowProps = {
  annotation: Annotation
  onBlur: (note: string, timestamp: string) => void
  onDelete: () => void
}

function AnnotationRow({ annotation, onBlur, onDelete }: AnnotationRowProps) {
  const [note, setNote] = useState(annotation.note)
  const [ts, setTs] = useState(annotation.timestamp)

  const flush = useCallback(
    (latestNote: string, latestTs: string): void =>
      onBlur(latestNote, latestTs),
    [onBlur],
  )

  const remaining = 150 - note.length

  return (
    <div className="annot-row" dir="rtl">
      <div className="annot-row-header">
        <input
          type="text"
          className="annot-ts-input"
          placeholder="الوقت مثلاً: 01:23"
          value={ts}
          dir="ltr"
          onChange={e => setTs(e.target.value)}
          onBlur={() => flush(note, ts)}
          aria-label="الوقت في التسجيل (اختياري)"
          maxLength={9}
        />
        <button
          className="annot-delete-btn"
          onClick={onDelete}
          aria-label="حذف الملاحظة"
          type="button"
        >
          حذف
        </button>
      </div>
      <textarea
        className="annot-note-input"
        placeholder="اكتب ملاحظتك هنا…"
        value={note}
        onChange={e => setNote(e.target.value.slice(0, 150))}
        onBlur={() => flush(note, ts)}
        aria-label="نص الملاحظة"
        rows={2}
      />
      <span className="annot-char-count" aria-hidden="true">
        {remaining} / 150
      </span>
    </div>
  )
}

// ─── Constants ────────────────────────────────────────────────────────────────

const allTags = ['الكل', ...Array.from(new Set(videos.flatMap(v => v.tags)))]

// ─── Library ──────────────────────────────────────────────────────────────────

export default function Library() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeTag, setActiveTag] = useState('الكل')
  const [searchQuery, setSearchQuery] = useState('')
  const { get, set, store } = useAnnotations()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeModal = useCallback(() => setSelectedVideo(null), [])

  useFocusTrap(modalRef, selectedVideo !== null, closeModal)

  const filtered = videos.filter(v => {
    const tagOk = activeTag === 'الكل' || v.tags.includes(activeTag)
    const queryOk =
      searchQuery.trim() === '' ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
    return tagOk && queryOk
  })

  const annotations = selectedVideo ? get(String(selectedVideo.id)) : []

  const handleAdd = (): void => {
    if (!selectedVideo) return
    const id = String(selectedVideo.id)
    set(id, [
      ...get(id),
      { timestamp: '', note: '', createdAt: new Date().toISOString() },
    ])
  }

  const handleBlur = useCallback(
    (idx: number, note: string, timestamp: string): void => {
      if (!selectedVideo) return
      const id = String(selectedVideo.id)
      const current = get(id)
      if (note.trim() === '') {
        set(id, current.filter((_, i) => i !== idx))
      } else {
        set(
          id,
          current.map((a, i) => (i === idx ? { ...a, note, timestamp } : a)),
        )
      }
    },
    [get, selectedVideo, set],
  )

  const handleDelete = useCallback(
    (idx: number): void => {
      if (!selectedVideo) return
      const id = String(selectedVideo.id)
      set(id, get(id).filter((_, i) => i !== idx))
    },
    [get, selectedVideo, set],
  )

  return (
    <>
      {/* Scoped styles for features added in this file (Library.css is read-only) */}
      <style>{`
        /* Search */
        .lib-search-wrap { margin-bottom: 1.5rem; }
        .lib-search {
          width: 100%;
          padding: .6rem 1.1rem;
          border-radius: 999px;
          border: 1px solid var(--color-gold);
          background: transparent;
          color: var(--color-text);
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: .95rem;
          direction: rtl;
        }
        .lib-search:focus { outline: none; box-shadow: 0 0 0 3px rgba(201,168,76,.3); }
        .lib-search::placeholder { color: var(--color-text-muted); }

        /* Empty state */
        .lib-empty-state {
          text-align: center;
          color: var(--color-text-muted);
          padding: 3rem 0;
          font-family: 'Amiri', serif;
          font-size: 1.2rem;
        }

        /* Card wrapper + annotation button */
        .vid-card-wrap { position: relative; }
        .vid-annot-btn {
          position: absolute;
          bottom: 3.1rem;
          left: .6rem;
          background: rgba(0,0,0,.55);
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: .8rem;
          transition: background .2s;
          z-index: 5;
          padding: 0;
        }
        .vid-annot-btn:hover,
        .vid-annot-btn:focus { background: var(--color-gold); outline: none; }
        .vid-annot-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: var(--color-gold);
          color: var(--color-dark-bg);
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          font-size: .58rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          pointer-events: none;
          line-height: 1;
        }

        /* Export */
        .lib-export-wrap { margin-top: 2rem; display: flex; justify-content: flex-start; }
        .lib-export-btn {
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          background: transparent;
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: .8rem;
          cursor: pointer;
          opacity: .6;
          transition: opacity .2s, background .2s, color .2s;
        }
        .lib-export-btn:hover,
        .lib-export-btn:focus { opacity: 1; background: var(--color-gold); color: var(--color-dark-bg); outline: none; }

        /* Extended modal (adds scroll) */
        .vmodal-inner--ext { max-height: 90vh; overflow-y: auto; }

        /* Annotations section */
        .annot-section {
          margin-top: 1.5rem;
          border-top: 1px solid var(--color-border, #333);
          padding-top: 1rem;
          direction: rtl;
        }
        .annot-heading {
          font-family: 'Amiri', serif;
          font-size: 1.1rem;
          margin-bottom: .75rem;
          color: var(--color-text);
        }
        .annot-empty { color: var(--color-text-muted); font-size: .875rem; margin-bottom: .75rem; }
        .annot-row { margin-bottom: .75rem; display: flex; flex-direction: column; gap: .35rem; }
        .annot-ts-input {
          width: 145px;
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid var(--color-border, #444);
          background: transparent;
          color: var(--color-text);
          font-family: monospace;
          font-size: .85rem;
        }
        .annot-note-input {
          width: 100%;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid var(--color-border, #444);
          background: transparent;
          color: var(--color-text);
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: .875rem;
          resize: vertical;
          direction: rtl;
          box-sizing: border-box;
        }
        .annot-ts-input:focus,
        .annot-note-input:focus { outline: none; border-color: var(--color-gold); }
        .annot-char-count {
          font-size: .72rem;
          color: var(--color-text-muted);
          direction: ltr;
          text-align: left;
          display: block;
        }
        .annot-add-btn {
          margin-top: .25rem;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px dashed var(--color-gold);
          color: var(--color-gold);
          background: transparent;
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: .85rem;
          cursor: pointer;
          transition: background .2s;
        }
        .annot-add-btn:hover,
        .annot-add-btn:focus { background: rgba(201,168,76,.12); outline: none; }

        .annot-row-header { display: flex; align-items: center; gap: .5rem; justify-content: space-between; }
        .annot-delete-btn {
          padding: 3px 12px;
          border-radius: 999px;
          border: 1px solid rgba(220,53,69,.5);
          color: rgba(220,53,69,.8);
          background: transparent;
          font-family: 'Cairo', system-ui, sans-serif;
          font-size: .78rem;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
          flex-shrink: 0;
        }
        .annot-delete-btn:hover,
        .annot-delete-btn:focus { background: rgba(220,53,69,.12); border-color: rgb(220,53,69); color: rgb(220,53,69); outline: none; }
      `}</style>

      <div className="library-page">
        <Container className="py-5">

          <h1 className="library-heading">المكتبة الإلكترونية</h1>

          {/* Search bar */}
          <div className="lib-search-wrap">
            <input
              type="search"
              className="lib-search"
              placeholder="ابحث عن محاضرة…"
              dir="rtl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="البحث في المحاضرات"
            />
          </div>

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

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <p className="lib-empty-state" role="status" aria-live="polite">
              لا توجد نتائج
            </p>
          ) : (
            <div className="videos-grid">
              {filtered.map(v => (
                <div key={v.id} className="vid-card-wrap">
                  <VideoCard video={v} onClick={() => setSelectedVideo(v)} />
                </div>
              ))}
            </div>
          )}

          {/* Unobtrusive global export */}
          <div className="lib-export-wrap">
            <button
              className="lib-export-btn"
              onClick={() => exportAllAsPdf(store)}
              aria-label="تصدير جميع الملاحظات كـ PDF"
            >
              تصدير الملاحظات ↓
            </button>
          </div>

          {/* Unified modal: video + annotations */}
          {selectedVideo && (
            <div
              className="vmodal-overlay"
              onClick={closeModal}
              role="dialog"
              aria-modal={true}
              aria-label="عرض المحاضرة والملاحظات"
            >
              <div
                className="vmodal-inner vmodal-inner--ext"
                ref={modalRef}
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
              >
                <button
                  className="vmodal-close"
                  onClick={closeModal}
                  aria-label="إغلاق"
                >
                  ×
                </button>

                <iframe
                  className="vmodal-iframe"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />

                <h2 className="vmodal-title">{selectedVideo.title}</h2>
                <p className="vmodal-date">{selectedVideo.date}</p>
                <p className="vmodal-desc">{selectedVideo.description}</p>

                {/* Annotations panel */}
                <div className="annot-section" aria-label="قسم الملاحظات">
                  <h3 className="annot-heading">الملاحظات</h3>

                  {annotations.length === 0 && (
                    <p className="annot-empty">لا توجد ملاحظات بعد</p>
                  )}

                  {annotations.map((ann, idx) => (
                    <AnnotationRow
                      key={ann.createdAt}
                      annotation={ann}
                      onBlur={(note, ts) => handleBlur(idx, note, ts)}
                      onDelete={() => handleDelete(idx)}
                    />
                  ))}

                  <button
                    className="annot-add-btn"
                    onClick={handleAdd}
                    aria-label="أضف ملاحظة جديدة"
                  >
                    + أضف ملاحظة
                  </button>
                </div>
              </div>
            </div>
          )}

        </Container>
      </div>
    </>
  )
}
