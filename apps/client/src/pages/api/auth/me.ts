// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ensureDbConnect } from '@/lib/dbConnect'
import { getUser } from '@/lib/middleware'

type Data = {
  username?: string
  password?: string
  msg?: string
  user?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('me handler called')

  await ensureDbConnect()
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    getUser(token, (user: any) => {
      if (!user) {
        res.status(403).json({ msg: 'forbidden' })
        return
      }
      console.log(user)

      res.json({ user: user })
    })
  }
}
