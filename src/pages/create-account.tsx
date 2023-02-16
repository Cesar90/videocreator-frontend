import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core'
import { Link as LinkRounter, useHistory } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useAxios from 'axios-hooks'
import { AxiosError } from 'axios'
import { APIURL } from '../api/index'
import { notify, notifySuccess } from '../utils/notify'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function CreateAccount() {
  const history = useHistory()
  const classes = useStyles()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    typeuser: '',
  })

  const { name, email, password, typeuser } = state
  const [, register] = useAxios(
    {
      url: `${APIURL}/register`,
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

  const handleOptionSelect = (value: string) => {
    setState({
      ...state,
      typeuser: value,
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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={handleChange('name')}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={handleChange('email')}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={handleChange('password')}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type User</InputLabel>
                <Select
                  value={typeuser}
                  onChange={(e) => handleOptionSelect(e.target.value as string)}
                >
                  <MenuItem value='TEACHER'>TEACHER</MenuItem>
                  <MenuItem value='STUDENT'>STUDENT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <LinkRounter to='/'>Already have an account? Sign in</LinkRounter>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
