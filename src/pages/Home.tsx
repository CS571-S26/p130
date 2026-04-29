import { Container, Row, Col, Button, Badge } from 'react-bootstrap'
import logoSrc from '../assets/logo.png'
import './Home.css'

function HeroLogo() {
  return (
    <div className="hero__logo-circle">
      <img src={logoSrc} alt="شعار مركز الإمام جابر بن زيد" className="hero__logo-img" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
        <div className="hero__orb hero__orb--3" aria-hidden="true" />

        <Container className="hero__content position-relative" style={{ zIndex: 2 }}>
          <HeroLogo />

          <Badge className="hero__eyebrow-badge mb-3">المخيم الصيفي</Badge>

          <h1 id="hero-title" className="hero__title">
            مركز الإمام
            <br />
            <span className="hero__title-accent">جابر بن زيد</span>
          </h1>

          <p className="hero__tagline">
            رحلة علم وإيمان وتميز — نبني جيلاً واعياً على قيم الإمام جابر بن زيد
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap mt-2">
            <Button
              size="lg"
              className="btn-gold"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              اعرف أكثر
            </Button>
            <Button
              size="lg"
              variant="outline-light"
              className="btn-hero-outline"
              onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
            >
              شاهد الفيديو
            </Button>
          </div>

          <div className="hero__social" aria-label="وسائل التواصل الاجتماعي">
            <a
              href="https://www.instagram.com/alimam_jaber_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="إنستغرام"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>alimam_jaber_</span>
            </a>

            <span className="hero__social-sep" aria-hidden="true" />

            <a
              href="https://www.youtube.com/@alimam_jaber"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link hero__social-link--yt"
              aria-label="يوتيوب"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>alimam_jaber</span>
            </a>
          </div>
        </Container>

        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-dot" />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="about-section" aria-labelledby="about-title">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <Badge className="section-badge mb-3">من نحن</Badge>
              <h2 id="about-title" className="section-title mb-3">
                مركز الإمام جابر بن زيد
              </h2>
              <div className="section-divider mx-auto mb-4" />
              <p className="about-body">
                مركز الإمام جابر بن زيد مؤسسة تعليمية وتربوية تسعى إلى تنشئة الجيل
                على قيم الإسلام الأصيل وعلم الإمام الجليل جابر بن زيد الأزدي،
                أحد أبرز علماء التابعين وفقيه البصرة. يحمل المركز لواء نشر المعرفة
                وتعزيز الهوية الدينية والثقافية من خلال برامج تعليمية متنوعة
                وأنشطة صيفية هادفة تجمع بين الترفيه والتثقيف.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center mt-4">
            <Col lg={8}>
              <Row className="stats-row g-0">
                <Col className="stat-cell text-center py-4">
                  <div className="stat-number">١٠٠٠+</div>
                  <div className="stat-label">طالب مستفيد</div>
                </Col>
                <Col className="stat-cell stat-cell--divider text-center py-4">
                  <div className="stat-number">٥٠+</div>
                  <div className="stat-label">برنامج تعليمي</div>
                </Col>
                <Col className="stat-cell text-center py-4">
                  <div className="stat-number">١٥+</div>
                  <div className="stat-label">سنة من العطاء</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── YouTube Video ──────────────────────────────────────── */}
      <section id="video" className="video-section" aria-labelledby="video-title">
        <Container>
          <Row className="justify-content-center text-center mb-4">
            <Col lg={8}>
              <Badge className="section-badge section-badge--gold mb-3">المخيم الصيفي</Badge>
              <h2 id="video-title" className="section-title section-title--light mb-2">
                شاهد المخيم الصيفي
              </h2>
              <p className="video-subtitle">
                اكتشف تجربة لا تُنسى من الأنشطة والبرامج والذكريات الجميلة
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/I8mayeU-SXk"
                  title="فيديو المخيم الصيفي — مركز الإمام جابر بن زيد"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}
