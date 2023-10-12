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
  courses?: CourseStructure[]
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('getting all courses handler called')

  await ensureDbConnect()
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    getUser(token, async (user: any) => {
      if (!user) {
        res.status(403).json({ message: 'forbidden' })
        return
      }
      const courses = await Course.find({})
      res.json({ courses })
    })
  }
}
