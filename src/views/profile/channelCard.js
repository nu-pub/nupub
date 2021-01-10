import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import firebase from "firebase";
import { Link } from "react-router-dom";

const ChannelCardContainer = styled(Box)`
  * > a {
    text-decoration: none;
  }
  border: 1px solid #efefef;
`;

const ChannelTitle = styled.span`
  font-family: "Quicksand", sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  color: black;
`;

const ChannelCard = (props) => {
  const [channelTitle, setChannelTitle] = useState(props.title);
  const [numBlocks, setNumBlocks] = useState("");

  useEffect(() => {});

  return (
    <ChannelCardContainer m={2} py={5} px={2}>
      <Link
        to={`/channel/${props.channelId}`}
        style={{ textDecoration: "none" }}
      >
        <ChannelTitle>{channelTitle}</ChannelTitle>
      </Link>
    </ChannelCardContainer>
  );
};

export default ChannelCard;
