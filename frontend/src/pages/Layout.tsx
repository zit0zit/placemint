import { Outlet } from 'react-router-dom'
import { Footer } from '../comps/Footer/Footer'
import { Header } from '../comps/Header/Header'

export function Layout() {
  return (
    <>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
