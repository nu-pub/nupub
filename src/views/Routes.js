// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { Switch, Route } from "react-router-dom";
import BlockPage from "../views/block/blockPage";
import ChannelPage from "../views/channel/channelPage";
import ProfilePage from "../views/profile/profilePage";
import SourcePage from "../views/source/sourcePage";
import SourceCreatePage from "../views/source/sourceCreate";
import SourceSearchPage from "../views/source/sourceSearchPage";
// TODO: remove
import StylePage from "./components/StylePage";
import Error from "../views/misc/Error";

//get user name if signed in

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={SourceSearchPage} />
    <Route path="/user/:userId" component={ProfilePage} />
    <Route path="/channel/:channelId" component={ChannelPage} />
    <Route path="/block/:blockId" component={BlockPage} />
    {/* <Route path="/source/create" component={SourceCreatePage} /> */}
    <Route path="/source/:sourceId" component={SourcePage} />
    {/* where cid is content id */}
    <Route path="/source/:sourceId/:cid" component={SourcePage} />
    {/* TODO: remove before deploy */}
    <Route path="/_/style" component={StylePage} />
    <Route component={Error} />
  </Switch>
);

export default Routes;
