import React from "react";
import Firebase from "firebase/app";
import { useDocument } from "react-firebase-hooks/firestore";

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
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>
    </div>
  );
};

export default SourcePage;
