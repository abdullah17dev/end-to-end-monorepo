import { atom } from 'recoil'

export interface Course {
  _id: string
  title: string
  description: string
  image: string
  price: string
}

export const courseState = atom<{ isLoading: boolean; course: Course | null }>({
  key: 'courseState',
  default: {
    isLoading: true,
    course: null,
  },
})
