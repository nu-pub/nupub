import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Auth from "./auth";

const Header = () => {
  return (
    <div>
      <Helmet defaultTitle="nupub" titleTemplate="%s | nupub">
        <title>nupub</title>
      </Helmet>
      <Auth />
    </div>
  );
};

export default Header;
