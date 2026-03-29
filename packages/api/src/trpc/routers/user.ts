import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { users } from '../../db/schema'
import { publicProcedure, router } from '../index'

export const userRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.select().from(users)),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const result = await ctx.db.select().from(users).where(eq(users.id, input.id))
    return result[0] ?? null
  }),

  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(users).values(input).returning()
      return result[0]
    }),
})
