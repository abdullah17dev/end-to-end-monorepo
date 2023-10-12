// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Course } from 'db'
import { ensureDbConnect } from '@/lib/dbConnect'
import { getUser } from '@/lib/middleware'

type CourseStructure = {
  _id: string
  title: string
  description: string
  image: string
  price: string
}

type Data = {
  course?: CourseStructure
  msg?: string
  user?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('getting single course handler called')

  await ensureDbConnect()

  const courseId = req.query.courseId
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const course = await Course.findById(courseId)

    getUser(token, (user: any) => {
      if (!user) {
        res.status(403).json({ msg: 'forbidden' })
        return
      }

      res.status(200).json({ course })
    })
  }
}
