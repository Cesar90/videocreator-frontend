import { ILogin, IProfile, IResponseVideos } from '../utils/types'
import { IContext2 } from './AppContext'

export enum Types {
  LOGIN = 'LOGIN',
  LOAD_PROFILE = 'LOAD_PROFILE',
  LOAD_VIDEOS = 'LOAD_VIDEOS',
  FOLLOW_USER = 'FOLLOW_USER',
}

export interface AddProfileAction {
  type: Types.LOGIN
  payload: ILogin
}

export interface LoadProfileAction {
  type: Types.LOAD_PROFILE
  payload: IProfile
}

export interface LoadVideosAction {
  type: Types.LOAD_VIDEOS
  payload: IResponseVideos[]
}

export interface FollowUserAction {
  type: Types.FOLLOW_USER
  payload: {
    followingUserId: number
    action: string
  }
}

export type MainAction = AddProfileAction | LoadProfileAction | LoadVideosAction | FollowUserAction

export function reducer(state: IContext2, action: MainAction): IContext2 {
  switch (action.type) {
    case Types.LOGIN:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload,
      }
    case Types.LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      }
    case Types.LOAD_VIDEOS:
      action.payload.map((video) => {
        const followedBy = video.user.followedBy
        const followerIds = followedBy.map((followed) => followed.followerId)
        if (!followerIds.includes(state.user.id)) {
          video.followAndUnFollow = true
        }
        if (state.user.id !== video.user.id) {
          const likevideos = video.likevideos.map((likevideo) => likevideo.userId)
          if (!likevideos.includes(state.user.id)) {
            video.liked = false
          }
        }
      })
      return {
        ...state,
        videos: action.payload
      }
    case Types.FOLLOW_USER:
      state.videos.map((video) => {
        const followedBy = video.user.followedBy
        followedBy.map((followed) => followed.followerId)
        if (action.payload.action === 'Follower') {
          video.user.followedBy.push({
            followerId: state.user.id,
          })
          video.followAndUnFollow = true
        } else {
          const newFollowers = video.user.followedBy.filter(
            (followed) => followed.followerId !== state.user.id,
          )
          video.user.followedBy = newFollowers
          video.followAndUnFollow = false
        }
      })

      return {
        ...state,
      }
    default:
      break
  }
  return state
}
