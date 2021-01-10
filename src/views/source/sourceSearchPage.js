import React, { useEffect } from "react";
import Firebase from "firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import SourceSearchCard from "./sourceCard";

const SourceSearchPage = () => {
  const [value, loading, error] = useCollection(
    Firebase.firestore().collection(`sources`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  if (loading || error) {
    return null;
  }

  const sources = value.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return (
    <div className="sourceSearchPage">
      <div className="sourceTop">top</div>
      <div className="sourceList">
        {sources.map((e) => (
          <SourceSearchCard
            title={e.title}
            creator={e.creator}
            sourceId={e.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SourceSearchPage;
