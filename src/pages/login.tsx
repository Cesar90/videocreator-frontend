import React, { useState, useContext } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useAxios from 'axios-hooks'
import { Link as LinkRounter } from 'react-router-dom'
import { APIURL } from '../api/index'
import { notify, notifySuccess } from '../utils/notify'
import { ILogin } from '../utils/types'
import { AppContext } from '../context/AppContext'
import { Types } from '../context/Reducer'
import { AxiosError } from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignInSide() {
  const classes = useStyles()
  const { dispatch } = useContext(AppContext)
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { email, password } = state

  const [, register] = useAxios(
    {
      url: `${APIURL}/login`,
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
      const result = (await (
        await register({
          data: state,
        })
      ).data.user) as ILogin
      localStorage.setItem('userInfoVideo', JSON.stringify(result))
      dispatch({
        type: Types.LOGIN,
        payload: result,
      })
      notifySuccess('Login successfully')
    } catch (error) {
      const err = error as AxiosError
      notify(err.response?.data.error)
    }
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              value={email}
              onChange={handleChange('email')}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              value={password}
              onChange={handleChange('password')}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <LinkRounter to='/create-account'>{'Don\'t have an account? Sign Up'}</LinkRounter>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
