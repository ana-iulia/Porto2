import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ChatWidget from './components/chat/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
// import ProjectDetail from './pages/ProjectDetail' // future feature
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Interview from './pages/Interview'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            {/* <Route path="/projects/:id" element={<ProjectDetail />} /> */}{/* future feature */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/interview" element={<Interview />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </BrowserRouter>
  )
}
