import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import { db } from '../db'
import type { Database } from '../db'

export interface Context {
  db: Database
}

export const createContext = (): Context => ({ db })

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
