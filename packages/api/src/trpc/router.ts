import { helloRouter } from './routers/hello'
import { taskRouter } from './routers/task'
import { userRouter } from './routers/user'

import { router } from './index'

export const appRouter = router({
  hello: helloRouter,
  user: userRouter,
  task: taskRouter,
})

export type AppRouter = typeof appRouter
