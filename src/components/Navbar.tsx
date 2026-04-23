import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import logoSrc from '../assets/logo.png'
import './Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <BSNavbar sticky="top" expand="md" className="site-navbar py-0">
      <Container style={{ maxWidth: 'var(--max-width)' }} className="px-3 px-md-4">

        {/* Brand — appears on the right in RTL (first DOM child) */}
        <BSNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none py-2"
        >
          <div className="navbar__logo-circle">
            <img
              src={logoSrc}
              alt="شعار مركز الإمام جابر بن زيد"
              className="navbar__logo-img"
            />
          </div>
          <div className="navbar__brand-text d-none d-sm-flex flex-column">
            <span className="navbar__brand-sub">مركز الإمام</span>
            <span className="navbar__brand-name">جابر بن زيد</span>
          </div>
        </BSNavbar.Brand>

        {/* Mobile hamburger — auto-shown below md breakpoint */}
        <BSNavbar.Toggle aria-controls="main-nav" className="navbar__toggler" />

        {/* Nav links — collapse on mobile */}
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto gap-1 pb-2 pb-md-0">
            <Nav.Link
              as={Link}
              to="/"
              active={pathname === '/'}
              className="nav-pill"
            >
              الرئيسية
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/library"
              active={pathname === '/library'}
              className="nav-pill"
            >
              المكتبة الإلكترونية
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/news"
              active={pathname === '/news'}
              className="nav-pill"
            >
              المجلة
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>

      </Container>
    </BSNavbar>
  )
}
