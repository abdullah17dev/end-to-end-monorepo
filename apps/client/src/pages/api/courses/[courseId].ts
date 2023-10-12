// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Course } from 'db'
import { ensureDbConnect } from '@/lib/dbConnect'
import { getUser } from '@/lib/middleware'

type Data = {
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('updating course handler called')

  await ensureDbConnect()

  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const course = await Course.findByIdAndUpdate(
      req.query.courseId,
      req.body,
      {
        new: true,
      }
    )

    getUser(token, (user: any) => {
      if (!user) {
        res.status(403).json({ message: 'forbidden' })
        return
      }
      if (course) {
        res.json({ message: 'Course updated successfully' })
      } else {
        res.status(404).json({ message: 'Course not found' })
      }
    })
  }
}
