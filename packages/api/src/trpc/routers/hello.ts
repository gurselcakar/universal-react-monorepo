import { publicProcedure, router } from '../index'

export const helloRouter = router({
  greet: publicProcedure.query(() => ({ message: 'Hello World from tRPC! 👋' })),
})
