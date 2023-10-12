import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Card } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { userEmailState, isUserLoading } from 'store'
import { Loading } from 'ui'

function AddCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')

  const userEmail = useRecoilValue(userEmailState)
  const userLoading = useRecoilValue(isUserLoading)

  if (userLoading) {
    return <Loading />
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '80vh',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            variant={'outlined'}
            style={{ width: 400, padding: 20, marginTop: 30, height: '100%' }}
          >
            <TextField
              style={{ marginBottom: 10 }}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              fullWidth={true}
              label="Title"
              variant="outlined"
            />

            <TextField
              style={{ marginBottom: 10 }}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              fullWidth={true}
              label="Description"
              variant="outlined"
            />

            <TextField
              style={{ marginBottom: 10 }}
              onChange={(e) => {
                setImage(e.target.value)
              }}
              fullWidth={true}
              label="Image link"
              variant="outlined"
            />

            <TextField
              style={{ marginBottom: 10 }}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
              fullWidth={true}
              label="Price"
              variant="outlined"
            />

            <Button
              size={'large'}
              variant="contained"
              onClick={async () => {
                await axios.post(
                  `/api/createcourses`,
                  {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price,
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                  }
                )
                alert('Added course!')
              }}
            >
              {' '}
              Add course
            </Button>
          </Card>
        </div>
      </div>
    )
  }
}
export default AddCourse
