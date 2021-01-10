import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "./auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import '../css/header.css'

const Header = () => {

  const [user, loading, error] = useAuthState(firebase.auth())

  console.log(user)

  return (
    <div>
      <Helmet defaultTitle="nupub" titleTemplate="%s | nupub">
        <title>nupub</title>
      </Helmet>
      <Auth />
      <div className="profileButton">
        {user  && 
        (
            <Link to={'/user/'+user.uid}>My Profile</Link>
        )
        }
      </div>
      
    </div>
  );
};

export default Header;
