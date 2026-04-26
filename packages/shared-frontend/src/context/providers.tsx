'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import superjson from 'superjson'

import { sharedFrontendEnv } from '../lib/env'
import { trpc } from '../lib/trpc'

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 30 * 1000 } },
  })

let browserQueryClient: QueryClient | undefined

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${sharedFrontendEnv.PUBLIC_API_BASE_URL}/api/trpc`,
          transformer: superjson,
          fetch: (url, options) => fetch(url, { ...options, credentials: 'include' }),
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
