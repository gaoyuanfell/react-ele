import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from './Login'
import { Home } from './Home'

export function Main(){
  return (
    <BrowserRouter>
      <Route path="/login" exact component={ Login } ></Route>
      <Route path="/home" exact component={ Home }></Route>
    </BrowserRouter>
  )
}