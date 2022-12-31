import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import {
  Account,
  Applied,
  Companies,
  Employer,
  Home,
  Jobs,
  Layout,
  Manager,
  Reviews,
  Signin,
  Signup,
  Skills,
} from './pages'

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
            <Route path="/for-employer" element={<Employer />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/applied" element={<Applied />} />
            <Route path="/manager" element={<Manager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
