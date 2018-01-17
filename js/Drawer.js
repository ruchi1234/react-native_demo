/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import SideBar from "./components/sidebar";
import Login from "./components/login/";
import Signup from "./components/signup/";
import Lobby from "./components/lobby/";
import Profile from "./components/profile/";
import Challange from "./components/challange/";
import AddChallange from './components/challange/addChallange';

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    Login: { screen: Login },
    Signup: { screen: Signup },
    Lobby: { screen: Lobby },
    Profile: { screen: Profile },
    Challange: { screen: Challange },
    AddChallange: { screen: AddChallange }
  },
  {
    initialRouteName: "Signup",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
