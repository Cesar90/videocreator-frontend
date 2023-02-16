export interface IResponseVideos extends IVideo {
  user: {
    email: string
    id: number
    name: string
    followedBy: {
      followerId: number
    }[]
  }
  likevideos: ILikeVideo[]
}

export interface ILikeVideo {
  userId: number
  videoId: number
}

export interface IVideo {
  id: number
  description: string
  title: string
  url: string
  published: boolean
  count: number
  followAndUnFollow?: boolean
  liked?: boolean
}

export interface ILikeVideo {
  id: number
  _count: {
    likevideos: number
  }
}

export interface IProfile {
  id: number
  name: string
  typeuser: string
  videos: IVideo[]
  followers: IUser[]
  followedBy: number[]
  likesVideo: ILikeVideo[]
}

export interface IUser extends ILogin {
  id: number
}

export interface ILogin {
  id: number
  email: string
  name: string
  typeuser: string
  token: string
}

export interface IRegisterInput {
  email: string
  name: string
  password: string
  typeuser: string
}

export interface IRegisterResponse {
  message: string
}
