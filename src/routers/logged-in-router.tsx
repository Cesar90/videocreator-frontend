import React from 'react'
import { ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateVideo from 'pages/video/create-video'
import ListVideos from 'pages/video/list-video'
import Profile from 'pages/user/profile'

const routes = [
  { path: '/create-video', component: <CreateVideo /> },
  { path: '/videos', component: <ListVideos /> },
  { path: '/', component: <Profile /> },
]

export const LoggedInRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
          {/* <Redirect to="/" /> */}
          <Route>{/* <NotFound /> */}</Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  )
}
