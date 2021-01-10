import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import Box from "@material-ui/core/Box";
import Paragraph from "../components/Paragraph";
import { SourceParagraph } from "../source/sourcePage";
import { Link } from "react-router-dom";
import "../../css/channelPage.css";

const BlockCardBox = styled(Box)`
  border: 1px solid #e2e2e2;
  border-radius: 3px;
`;

const SubHeading = styled.span`
  font-weight: bold;
  font-family: "Quicksand", sans-serif;
  text-decoration: none;
`;

const BlockCard = (props) => {
  const db = firebase.firestore();

  const [text, setText] = useState("");
  const [sourceTitle, setsourceTitle] = useState("");

  const newPath = props.id.replace(/-/gi, "/");

  useEffect(() => {
    db.doc(newPath)
      .get()
      .then(function (doc) {
        setText(doc.data().body);
      });
    db.collection("sources")
      .doc(props.source)
      .get()
      .then(function (doc) {
        if (doc.data().title != undefined) {
          setsourceTitle(doc.data().title);
        }
      });
  }, []);

  const creator = undefined;

  return (
    <BlockCardBox px={5} py={1} mx={1} my={5}>
      <Paragraph>{text}</Paragraph>
      <SubHeading>
        {creator || "some creator"} /{" "}
        <Link
          to={`/${newPath.replace("sources", "source")}`}
          style={{ textDecoration: "none" }}
        >
          {sourceTitle}
        </Link>
      </SubHeading>
    </BlockCardBox>
    // <div className="blockCard">
    //   <Link to={`/block/${props.id}`} style={{ textDecoration: "none" }}>
    //     <div className="blockSource">{sourceTitle}</div>
    //     <div>{text}</div>
    //   </Link>
    // </div>
  );
};

export default BlockCard;
