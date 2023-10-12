import { Signin } from 'ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { userState } from 'store'

export default function SigninPage() {
  const router = useRouter()
  const setUser = useSetRecoilState(userState)
  return (
    <div>
      <Signin
        onClick={async (username, password) => {
          const res = await axios.post(
            `/api/signin`,
            {
              username,
              password,
            },
            {
              headers: {
                'Content-type': 'application/json',
              },
            }
          )
          const data = res.data
          localStorage.setItem('token', data.token)
          setUser({
            userEmail: username,
            isLoading: false,
          })
          router.push('/')
        }}
      />
    </div>
  )
}
