'use client'

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Providers = ({ children } : { children: ReactNode } ) => {
  // ✅ ensures client is not recreated every render
  const [queryClient] = useState(() => new QueryClient())


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export default Providers