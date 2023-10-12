import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useRecoilValue } from 'recoil'
import { userEmailState } from 'store'
import { isUserLoading } from 'store'
import { useRouter } from 'next/router'
import { Loading } from 'ui'

export const Landing = () => {
  const userEmail = useRecoilValue(userEmailState)
  const userLoading = useRecoilValue(isUserLoading)
  const router = useRouter()

  if (userLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  if (userEmail) {
    return (
      <div>
        <Grid container style={{ padding: '5vw' }}>
          <Grid item xs={12} md={6} lg={6}>
            <div style={{ marginTop: 100 }}>
              <Typography variant={'h2'}>Coursera Admin</Typography>
              <Typography variant={'h5'}>
                A place to learn, earn and grow
              </Typography>
              {!userLoading && !userEmail && (
                <div style={{ display: 'flex', marginTop: 20 }}>
                  <div style={{ marginRight: 10 }}>
                    <Button
                      size={'large'}
                      variant={'contained'}
                      onClick={() => {
                        router.push('/signup')
                      }}
                    >
                      Signup
                    </Button>
                  </div>
                  <div>
                    <Button
                      size={'large'}
                      variant={'contained'}
                      onClick={() => {
                        router.push('/signin')
                      }}
                    >
                      Signin
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div></div>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
            <img
              src={
                'https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg'
              }
              width={'100%'}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}
