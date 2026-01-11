import Header from "@/components/Header"
import { ReactNode } from "react"

const Layout = ({
  children
} : { children: ReactNode }) => {
  return (
    <main className="home-main">
      <Header />
      <div className="home-main-wrapper">
        {children}
      </div>
    </main>
  )
}
export default Layout