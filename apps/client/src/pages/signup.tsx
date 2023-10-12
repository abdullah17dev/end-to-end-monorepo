import { Signup } from 'ui'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { userState } from 'store'

export default function SignupPage() {
  const router = useRouter()
  const setUser = useSetRecoilState(userState)
  return (
    <div>
      <Signup
        onClick={async (username, password) => {
          const response = await axios.post('/api/signup', {
            username,
            password,
          })

          if (response.data.token) {
            console.log('setting token now')

            localStorage.setItem('token', response.data.token)
            setUser({
              userEmail: username,
              isLoading: false,
            })
            router.push('/')
          }
        }}
      />
    </div>
  )
}
