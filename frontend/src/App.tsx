import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Companies, Home, Jobs, Layout, Reviews, Skills } from './pages'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
