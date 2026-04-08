import { Container, Row, Col, Card } from 'react-bootstrap'
import './Magazine.css'

function MagazineCard() {
  return (
    <Card className="bs-card magazine-card h-100 border-0">
      <div className="magazine-card__cover">
        <div className="magazine-card__emblem" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(198,155,58,0.4)" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="11" fill="rgba(198,155,58,0.12)" />
            <circle cx="20" cy="20" r="5" fill="rgba(198,155,58,0.3)" />
          </svg>
        </div>
      </div>
      <Card.Body className="magazine-card__body">
        <div className="skeleton-bar skeleton-bar--full mb-2" />
        <div className="skeleton-bar skeleton-bar--short" />
      </Card.Body>
    </Card>
  )
}

export default function Magazine() {
  return (
    <div className="magazine-page">
      <Container className="py-5">
        <h1 className="page-title">المجلة</h1>
        <p className="page-subtitle">
          قريباً — إصدارات المجلة الإلكترونية لمركز الإمام جابر بن زيد
        </p>
        <Row xs={1} sm={2} md={4} className="g-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Col key={i}>
              <MagazineCard />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}
