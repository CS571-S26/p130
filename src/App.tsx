import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Library from './pages/Library'
import Magazine from './pages/Magazine'
import News from './pages/News'
import './App.css'

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </main>
    </HashRouter>
  )
}
