import { Container, Row, Col, Card } from 'react-bootstrap'
import './Library.css'

function VideoCard() {
  return (
    <Card className="bs-card video-card h-100 border-0">
      <div className="video-card__thumb">
        <div className="video-card__play" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="22" fill="rgba(255,255,255,0.15)" />
            <polygon points="18,13 33,22 18,31" fill="rgba(255,255,255,0.85)" />
          </svg>
        </div>
      </div>
      <Card.Body className="video-card__body">
        <div className="skeleton-bar skeleton-bar--full mb-2" />
        <div className="skeleton-bar skeleton-bar--short" />
      </Card.Body>
    </Card>
  )
}

export default function Library() {
  return (
    <div className="library-page">
      <Container className="py-5">
        <h1 className="page-title">المكتبة الإلكترونية</h1>
        <p className="page-subtitle">
          قريباً — مجموعة متنوعة من المحاضرات والدروس والمقاطع التعليمية
        </p>
        <Row xs={1} sm={2} lg={3} className="g-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Col key={i}>
              <VideoCard />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
