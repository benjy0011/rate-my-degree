'use client'

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const Providers = ({ children } : { children: ReactNode } ) => {
  // ✅ ensures client is not recreated every render
  const [queryClient] = useState(() => new QueryClient())


  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
      </NuqsAdapter>   
    </QueryClientProvider>
  )
}
export default Providers