import React, { useState, useRef } from "react";
import Firebase from "firebase/app";
import Box from "@material-ui/core/Box";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import Paragraph from "../components/Paragraph";
import useDoubleClick from "use-double-click";

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
    { doc: docValue, collection: value },
    docLoading || loading,
    docError || error,
  ];
};

const SourceParagraph = ({ doc, setFocused, focused }) => {
  const boxRef = useRef();

  useDoubleClick({
    // onSingleClick: (e) => {},
    onDoubleClick: (e) => {
      setFocused(e.target.id);
    },
    ref: boxRef,
    latency: 250,
  });

  return (
    <Box ref={boxRef}>
      {doc.body.length > LENGTH_THRESHOLD && (
        <Paragraph id={doc.docid}>{doc.body}</Paragraph>
      )}
    </Box>
  );
};

const SourcePage = ({
  match: {
    params: { sourceId },
  },
}) => {
  console.log(sourceId);
  const [value, loading, error] = useDocumentAndCollection(sourceId);
  const [focused, setFocused] = useState();

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
      <pre>{`focused: ${focused || "n/a"}`}</pre>
      <h1>{value.doc.data().title}</h1>
      <h2>{value.doc.data().creator}</h2>
      {data.map((doc) => (
        <SourceParagraph doc={doc} focused={focused} setFocused={setFocused} />
      ))}
    </Box>
  );
};

export default SourcePage;
