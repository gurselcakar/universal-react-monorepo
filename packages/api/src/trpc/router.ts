import { helloRouter } from './routers/hello'
import { taskRouter } from './routers/task'

import { router } from './index'

export const appRouter = router({
  hello: helloRouter,
  task: taskRouter,
})

export type AppRouter = typeof appRouter
