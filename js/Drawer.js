/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import StartApp from "./components/appStart/";
import Home from "./components/home/";
import SideBar from "./components/sidebar";
import Login from "./components/login/";
import Signup from "./components/signup/";
import Lobby from "./components/lobby/";
import Profile from "./components/profile/";
import ProfileEdit from './components/profile/profileEdit';
import Challange from "./components/challange/";
import AddChallange from './components/challange/addChallange';
import ContactList from './components/contact/';
import Logout from './components/logout/';
const DrawerExample = DrawerNavigator(
  {
    StartApp: { screen: StartApp },
    Home: { screen: Home },
    Login: { screen: Login },
   
    Signup: { screen: Signup },
    Lobby: { screen: Lobby },
    Profile: { screen: Profile },
    ProfileEdit: {screen: ProfileEdit},
    Challange: { screen: Challange },
    AddChallange: { screen: AddChallange },
    ContactList: { screen: ContactList },
    Logout: { screen: Logout }

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
