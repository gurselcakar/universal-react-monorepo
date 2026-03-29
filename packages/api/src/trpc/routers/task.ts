import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { tasks } from '../../db/schema'
import { authenticatedProcedure, router } from '../index'

export const taskRouter = router({
  getAll: authenticatedProcedure.query(async ({ ctx }) =>
    ctx.db.select().from(tasks).where(eq(tasks.userId, ctx.user.id)),
  ),

  getById: authenticatedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.id, input.id))
      return result ?? null
    }),

  create: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        status: z.enum(['todo', 'in_progress', 'done', 'canceled']).default('todo'),
        dueDate: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [result] = await ctx.db
        .insert(tasks)
        .values({ ...input, userId: ctx.user.id })
        .returning()
      return result
    }),

  update: authenticatedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        status: z.enum(['todo', 'in_progress', 'done', 'canceled']).optional(),
        dueDate: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      const [result] = await ctx.db
        .update(tasks)
        .set({ ...data, updatedAt: new Date().toISOString() })
        .where(eq(tasks.id, id))
        .returning()
      return result
    }),
})
