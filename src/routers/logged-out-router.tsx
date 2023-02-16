import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateAccount from '../pages/create-account'
import Login from '../pages/login'
import Header from '../components/ui/Header'
import { ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import NotFound from './no-found'

export const LoggedOutRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/create-account'>
            <CreateAccount />
          </Route>
          <Route path='/' exact>
            <Login />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  )
}
