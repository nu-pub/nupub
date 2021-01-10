import React, { useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Helmet } from "react-helmet";
import Auth from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import firebase from "firebase";
import "../css/header.css";

const ProfileLink = styled.span`
  font-family: "Quicksand", sans-serif;
  font-size: 2em;
  text-decoration: false;
  color: black;
`;

const HeaderContainer = styled.header``;

const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <HeaderContainer>
      <Helmet defaultTitle="nupub" titleTemplate="%s | nupub">
        <title>nupub</title>
      </Helmet>
      {!loading && !error && user && (
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box>
            <Link
              to={`/user/${user ? user.uid : ""}`}
              style={{ textDecoration: "none" }}
            >
              <ProfileLink>{user ? user.displayName : ""}</ProfileLink>
            </Link>
          </Box>
          <Box>
            <Auth />
          </Box>
        </Box>
      )}
    </HeaderContainer>
  );
};

export default Header;
