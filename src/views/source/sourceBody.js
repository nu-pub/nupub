import React from "react";
import Firebase from "firebase/app";
import { useCollection } from "react-firebase-hooks/firestore";

const SourceBody = ({ id }) => {
  const [value, loading, error] = useCollection(
    Firebase.firestore().collection(`sources/${id}/body`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (error) {
    return <strong>Error: {JSON.stringify(error)}</strong>;
  } else if (loading) {
    return <span>Document: Loading...</span>;
  }

  const data = value.docs
    .map((doc) => ({ ...doc.data(), docid: doc.id }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <div>
      <p>
        {value && (
          <div>
            {data.map((doc) => (
              <React.Fragment key={doc.index}>
                <pre>{`path: source/${id}/${doc.docid} - index: ${doc.index}`}</pre>
                <p id={doc.docid}>{doc.body}</p>
              </React.Fragment>
            ))}

            {/* {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                <pre>{JSON.stringify(doc.data())}, </pre>
              </React.Fragment>
            ))} */}
          </div>
        )}
      </p>
    </div>
  );
};

export default SourceBody;
