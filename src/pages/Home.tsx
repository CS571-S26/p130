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
            <Button href="#about" size="lg" className="btn-gold">
              اعرف أكثر
            </Button>
            <Button href="#video" size="lg" variant="outline-light" className="btn-hero-outline">
              شاهد الفيديو
            </Button>
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
