import React, { useEffect, useContext } from 'react'
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { AxiosError } from 'axios'
import useAxios from 'axios-hooks'
import Layout from 'components/ui/Layout'
import Title from 'components/ui/Title'
import { APIURL } from 'api/index'
import { IProfile, IVideo } from 'utils/types'
import { useStyles } from './desing'
import { resetLocalStorage } from 'api/resetLocalStorage'
import { notify, notifySuccess } from 'utils/notify'
import { AppContext } from 'context/AppContext'
import { Types } from 'context/Reducer'

export default function Profile() {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  const [{ data, error }, refetch] = useAxios(`${APIURL}/profile`)

  const [, register] = useAxios(
    {
      url: `${APIURL}/publishunpublish`,
      method: 'PUT',
    },
    { manual: true },
  )

  useEffect(() => {
    if (data) {
      dispatch({
        type: Types.LOAD_PROFILE,
        payload: data as IProfile,
      })
    }
    if (error) {
      if (error.message === 'Request failed with status code 400') {
        resetLocalStorage()
      }
    }
  }, [data, refetch, error])

  const publishUnPublish = async (e: React.MouseEvent<HTMLButtonElement>, video: IVideo) => {
    e.preventDefault()
    try {
      await register({
        data: { videoId: video.id },
      })
      notifySuccess('The status of video has changed successfully')
      window.location.reload()
    } catch (error) {
      const err = error as AxiosError
      notify(err.response?.data.error)
    }
  }

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={12}>
          <Paper>
            <Title>My Profile</Title>
            <Typography component='p' variant='h4'>
              Name: {state.profile?.name}
            </Typography>
            {/* <Typography color="textSecondary" className={classes.depositContext}>
              on 15 March, 2019
            </Typography> */}
            <div>
              {/* <Link color="primary" href="#" onClick={preventDefault}>
                Test
              </Link> */}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>My Videos</Title>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Url</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Publish</TableCell>
                  <TableCell># Of Likes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.profile?.videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>
                      <a target='_blank' href={video.url} rel='noopener noreferrer'>
                        {video.url}
                      </a>
                    </TableCell>
                    <TableCell>{video.description}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onClick={(e) => publishUnPublish(e, video)}
                            checked={video.published}
                            color='secondary'
                            name='saveAddress'
                            value='yes'
                          />
                        }
                        label=''
                      />
                    </TableCell>
                    <TableCell>{video.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>My Followers</Title>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Type User</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.profile?.followers.map((follower) => (
                  <TableRow key={follower.id}>
                    <TableCell>{follower.name}</TableCell>
                    <TableCell>{follower.email}</TableCell>
                    <TableCell>{follower.typeuser}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}
