import React, { useState, useRef } from "react";
import Firebase from "firebase/app";
import Box from "@material-ui/core/Box";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import Paragraph from "../components/Paragraph";
import useDoubleClick from "use-double-click";
import styled from "styled-components";

const COLLECTION = "sources";

const LENGTH_THRESHOLD = 10;

const useDocumentAndCollection = (id) => {
  const [docValue, docLoading, docError] = useDocument(
    Firebase.firestore().doc(`${COLLECTION}/${id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [value, loading, error] = useCollection(
    Firebase.firestore().collection(`${COLLECTION}/${id}/body`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return [
    { document: docValue, collection: value },
    docLoading || loading,
    docError || error,
  ];
};

const SourceBlockContainer = styled(Box)`
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  transform: ${(props) => {
    if (props.focused == null) {
      return 0;
    } else if (props.focused) {
      return "translate(50px)";
    } else {
      return 0;
    }
  }};
`;

const SourceParagraph = ({ doc, setFocused, focused, handleConnect }) => {
  const boxRef = useRef();

  useDoubleClick({
    onSingleClick: (e) => {
      setFocused(null);
    },
    onDoubleClick: (e) => {
      setFocused(e.target.id);
    },
    ref: boxRef,
    latency: 250,
  });

  const f = focused == undefined ? focused : focused === doc.docid;

  return (
    <SourceBlockContainer focused={f}>
      <Paragraph id={doc.docid} focused={f} ref={boxRef}>
        {doc.body}
      </Paragraph>
      {!!f && (
        <Box>
          <h3>Connected To:</h3>
          <pre>id: {doc.docid}</pre>
          <button onClick={handleConnect} id={doc.docid}>
            Connect ➡️
          </button>
        </Box>
      )}
    </SourceBlockContainer>
  );
};

const useSearch = (search) => {
  return new URLSearchParams(search);
};

const SourcePage = ({
  match: {
    params: { sourceId },
  },
  location,
}) => {
  const qs = useSearch(location.search);
  const DEBUG = !!qs.get("debug");

  const [value, loading, error] = useDocumentAndCollection(sourceId);
  const [focused, setFocused] = useState(null);

  const handleConnect = (e) => {
    alert(`block_id: ${e.target.id}`);
  };

  if (error) {
    // TODO: REPLACE STYLE
    return <strong>Error: {JSON.stringify(error)}</strong>;
  } else if (loading) {
    // TODO: REPLACE STYLE
    return <span>Document: Loading...</span>;
  }

  // sort paragraphs by index
  const data = value.collection.docs
    .map((doc) => ({ ...doc.data(), docid: doc.id }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <Box maxWidth="630px">
      {DEBUG && <pre>{`focused: ${focused || "n/a"}`}</pre>}
      <h1>{value.document.data().title}</h1>
      <h2>{value.document.data().creator}</h2>
      {data
        // get rid of super short paragraphs
        .filter((doc) => doc.body.length > LENGTH_THRESHOLD)
        .map((doc) => (
          <SourceParagraph
            doc={doc}
            focused={focused}
            setFocused={setFocused}
            handleConnect={handleConnect}
          />
        ))}
    </Box>
  );
};

export default SourcePage;
