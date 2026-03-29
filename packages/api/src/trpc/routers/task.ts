import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { tasks } from '../../db/schema'
import { publicProcedure, router } from '../index'

export const taskRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => ctx.db.select().from(tasks)),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const result = await ctx.db.select().from(tasks).where(eq(tasks.id, input.id))
    return result[0] ?? null
  }),

  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        status: z.enum(['todo', 'in_progress', 'done', 'canceled']).default('todo'),
        userId: z.string(),
        dueDate: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.insert(tasks).values(input).returning()
      return result[0]
    }),

  update: publicProcedure
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
      const result = await ctx.db
        .update(tasks)
        .set({ ...data, updatedAt: new Date().toISOString() })
        .where(eq(tasks.id, id))
        .returning()
      return result[0]
    }),
})
