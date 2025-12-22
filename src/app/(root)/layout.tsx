import Header from "@/components/Header"
import { ReactNode } from "react"

const Layout = ({
  children
} : { children: ReactNode }) => {
  return (
    <main className="h-dvh">
      <Header />
      <div className="border-green-300 h-full flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  )
}
export default Layout