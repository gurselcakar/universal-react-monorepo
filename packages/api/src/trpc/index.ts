import { TRPCError, initTRPC } from '@trpc/server'
import { eq, and } from 'drizzle-orm'
import superjson from 'superjson'

import { auth } from '../auth'
import { db } from '../db'
import type { Database } from '../db'
import { member } from '../db/schema'

type Session = typeof auth.$Infer.Session.session
type User = typeof auth.$Infer.Session.user

export interface Context {
  db: Database
  session: Session | null
  user: User | null
}

export const createContext = async (opts: { headers: Headers }): Promise<Context> => {
  const sessionResult = await auth.api.getSession({ headers: opts.headers })
  return {
    db,
    session: sessionResult?.session ?? null,
    user: sessionResult?.user ?? null,
  }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  })
})

export const authenticatedProcedure = t.procedure.use(isAuthenticated)

const isAuthenticatedWithWorkspace = isAuthenticated.unstable_pipe(async ({ ctx, next }) => {
  const organizationId = ctx.session.activeOrganizationId
  if (!organizationId) {
    throw new TRPCError({
      code: 'PRECONDITION_FAILED',
      message: 'No active organization. Call setActiveOrganization first.',
    })
  }

  const [activeMember] = await ctx.db
    .select({ role: member.role })
    .from(member)
    .where(and(eq(member.userId, ctx.user.id), eq(member.organizationId, organizationId)))

  if (!activeMember) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Not a member of this organization.' })
  }

  return next({
    ctx: {
      ...ctx,
      organizationId,
      role: activeMember.role,
    },
  })
})

export const authenticatedWorkspaceProcedure = t.procedure.use(isAuthenticatedWithWorkspace)
