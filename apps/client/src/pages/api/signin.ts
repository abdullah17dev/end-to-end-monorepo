// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from 'db'
import jwt from 'jsonwebtoken'
import { ensureDbConnect } from '@/lib/dbConnect'
const SECRET = 'SECRET'

type Data = {
  token?: string
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('login handler called')

  await ensureDbConnect()

  const { username, password } = req.body
  const admin = await Admin.findOne({ username, password })
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, {
      expiresIn: '1h',
    })
    res.json({ message: 'Logged in successfully', token })
  } else {
    res.status(403).json({ message: 'Invalid username or password' })
  }
}
