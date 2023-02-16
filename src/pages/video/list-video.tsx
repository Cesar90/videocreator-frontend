import React, { useEffect, useContext } from 'react'
import {
  Button,
  Grid,
  CssBaseline,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core'
import useAxios from 'axios-hooks'
import { AxiosError } from 'axios'
import Layout from 'components/ui/Layout'
import { APIURL } from 'api/index'
import { resetLocalStorage } from 'api/resetLocalStorage'
import { AppContext } from 'context/AppContext'
import { IResponseVideos } from 'utils/types'
import { Types } from 'context/Reducer'
import { notify, notifySuccess } from 'utils/notify'
import { useStyles } from './desing'

export default function ListVideos() {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()

  const [, register] = useAxios(
    {
      url: `${APIURL}/follow`,
      method: 'PUT',
    },
    { manual: true },
  )

  const [{ data, error }] = useAxios(`${APIURL}/videos`)

  useEffect(() => {
    if (data) {
      dispatch({
        type: Types.LOAD_VIDEOS,
        payload: data,
      })
    }
    if (error) {
      if (error.message === 'Request failed with status code 400') {
        resetLocalStorage()
      }
    }
  }, [data, error])

  const followUser = async (
    e: React.MouseEvent<HTMLButtonElement>,
    video: IResponseVideos,
    action: string,
  ) => {
    e.preventDefault()
    try {
      await register({
        data: {
          followingId: video.user.id,
        },
      })
      dispatch({
        type: Types.FOLLOW_USER,
        payload: {
          followingUserId: video.user.id,
          action,
        },
      })
      notifySuccess('Action done successfully')
    } catch (error) {
      const err = error as AxiosError
      notify(err.response?.data.error)
    }
  }

  return (
    <Layout>
      <CssBaseline />
      <Grid container spacing={4}>
        {state.videos?.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image='https://source.unsplash.com/random'
                title='Image title'
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='h5' component='h2'>
                  {video.title}
                </Typography>
                <Typography>{video.description}</Typography>
              </CardContent>
              <CardActions>
                <Button target='_blank' href={video.url} size='small' color='primary'>
                  View Video
                </Button>
                <Button size='small' color='primary'>
                  Edit
                </Button>
              </CardActions>
              <CardContent>
                <Grid container>
                  <React.Fragment>
                    <Grid item xs={6}>
                      <Typography gutterBottom>Created By</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{video.user.name}</Typography>
                    </Grid>
                  </React.Fragment>
                  <React.Fragment>
                    {video.user.id !== state.user?.id && (
                      <Grid item xs={12}>
                        <Button
                          onClick={(e) =>
                            followUser(
                              e,
                              video,
                              video.followAndUnFollow ? 'Unfollower' : 'Follower',
                            )
                          }
                          fullWidth
                          variant='contained'
                          color='primary'
                        >
                          {video.followAndUnFollow ? 'Follower' : 'Unfollower'}
                        </Button>
                      </Grid>
                    )}
                  </React.Fragment>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}
