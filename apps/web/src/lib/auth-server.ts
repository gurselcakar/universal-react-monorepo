import { auth } from '@chalkboard/api'
import { headers } from 'next/headers'

export const getServerSession = async () => auth.api.getSession({ headers: await headers() })
