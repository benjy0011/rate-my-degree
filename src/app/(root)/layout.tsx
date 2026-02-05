import Footer from "@/components/Footer"
import Header from "@/components/Navbar/Header"
import { ReactNode } from "react"

const Layout = ({
  children
} : { children: ReactNode }) => {
  return (
    <main className="home-main">
      <Header />
      <div className="profile-main-wrapper">
        {children}
      </div>
      <Footer />
    </main>
  )
}
export default Layout