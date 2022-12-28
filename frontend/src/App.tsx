import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Companies,
  Empolyer,
  Home,
  Jobs,
  Layout,
  Reviews,
  Signin,
  Skills,
} from './pages'
import './App.scss'

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
            <Route path="/for-empolyer" element={<Empolyer />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
