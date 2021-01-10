import React from "react";
import Firebase from "firebase/app";
import { useDocument } from "react-firebase-hooks/firestore";
import { Helmet } from "react-helmet";
import SourceBody from "./sourceBody";

const COLLECTION = "sources";

const SourcePage = ({
  match: {
    params: { sourceId },
  },
}) => {
  const [value, loading, error] = useDocument(
    Firebase.firestore().doc(`${COLLECTION}/${sourceId}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <pre>id: {sourceId}</pre>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && (
          <div>
            <Helmet
              title={`${value.data().sourceTitle} by ${value.data().creator}`}
            />
            <span>Document: {JSON.stringify(value.data())}</span>
            <SourceBody id={sourceId} />
          </div>
        )}
      </p>
    </div>
  );
};

export default SourcePage;
