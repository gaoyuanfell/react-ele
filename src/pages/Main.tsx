import React from 'react'
import { HashRouter, Route, Redirect } from "react-router-dom";
import { Login } from './Login'
import { Home } from './Home'
import { Shop } from './Shop'

export function Main() {
  return (
    <HashRouter basename="/react-ele">
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" exact component={Login} ></Route>
      <Route path="/home" exact component={Home}></Route>
      <Route path="/shop" exact component={Shop}></Route>
    </HashRouter>
  )
}