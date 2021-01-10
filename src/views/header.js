import React, { useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Helmet } from "react-helmet";
import Auth from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "../css/header.css";

const HeaderContainer = styled.header``;

const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  const userCrumbs = "";

  return (
    <HeaderContainer>
      <Helmet defaultTitle="nupub" titleTemplate="%s | nupub">
        <title>nupub</title>
      </Helmet>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>{userCrumbs}</Box>
        <Box>
          <Auth />
        </Box>
      </Box>
    </HeaderContainer>
  );
};

export default Header;
