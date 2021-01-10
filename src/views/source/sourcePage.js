import React from "react";
import Firebase from "firebase/app";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { Helmet } from "react-helmet";
import Paragraph from "../components/Paragraph";

const COLLECTION = "sources";

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
    docLoading && loading,
    docError && error,
  ];
};

const SourcePage = ({
  match: {
    params: { sourceId },
  },
}) => {
  const [value, loading, error] = useDocumentAndCollection(sourceId);

  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  } else if (loading) {
    return <span>Document: Loading...</span>;
  }

  const data = value.collection.docs
    .map((doc) => ({ ...doc.data(), docid: doc.id }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <div>
      <h1>{value.doc.data().title}</h1>
      <h2>{value.doc.data().creator}</h2>
      {data.map((doc) => (
        <Paragraph key={doc.index}>{doc.body}</Paragraph>
      ))}
    </div>
  );
};

export default SourcePage;
