import React, { useState } from 'react'
import {
  Button,
  InputAdornment,
  Grid,
  TextField,
  CssBaseline,
  Typography,
  Container,
} from '@material-ui/core'
import { Link as LinkIcon } from '@material-ui/icons'
import useAxios from 'axios-hooks'
import { AxiosError } from 'axios'
import { useHistory } from 'react-router-dom'
import Layout from 'components/ui/Layout'
import { APIURL } from 'api/index'
import { notify, notifySuccess } from 'utils/notify'
import { useStylesCreate } from './desing'

export default function CreateVideo() {
  const history = useHistory()
  const classes = useStylesCreate()
  const [state, setState] = useState({
    title: '',
    url: '',
    description: '',
  })

  const { title, url, description } = state
  const [, register] = useAxios(
    {
      url: `${APIURL}/videos`,
      method: 'POST',
    },
    { manual: true },
  )

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await register({
        data: state,
      })
      notifySuccess('User created successfully')
      history.push('/')
    } catch (error) {
      const err = error as AxiosError
      notify(err.response?.data.error)
    }
  }

  return (
    <Layout>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Create new video
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={title}
                  onChange={handleChange('title')}
                  autoComplete='title'
                  name='title'
                  variant='outlined'
                  required
                  fullWidth
                  id='title'
                  label='Title'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={url}
                  placeholder='Add url for example youtube'
                  onChange={handleChange('url')}
                  name='url'
                  variant='outlined'
                  required
                  fullWidth
                  type='url'
                  id='url'
                  label='Url'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  minRows={3}
                  value={description}
                  onChange={handleChange('description')}
                  autoComplete='description'
                  name='description'
                  variant='outlined'
                  required
                  fullWidth
                  id='description'
                  label='Description'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  )
}
