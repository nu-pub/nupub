import React, { useState, useRef, useEffect } from "react";
import Firebase from "firebase/app";
import Helmet from "react-helmet";
import Box from "@material-ui/core/Box";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Paragraph from "../components/Paragraph";
import useDoubleClick from "use-double-click";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import ChannelLink from "./channelLink";

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

const StyledParagraph = styled(Paragraph)`
  &:hover {
    color: ${(props) => (props.focused ? "black" : "gray")};
  }
`;

const AddToChannelLabel = styled.span`
  font-weight: bold;
`;

const AddToChannelContainer = styled(Box)`
  font-family: "Quicksand", sans-serif;
  display: flex;
  justify-content: space-between;
`;

const AddToChannel = ({ path, sourceID, paragraphID }) => {
  const [channelId, setChannelId] = React.useState("");
  const [user, loading, error] = useAuthState(Firebase.auth());
  const [channelList, setChannelList] = useState([]);
  const [recentChannel, setRecentChannel] = useState("");
  const [recentId, setRecentId] = useState("");

  const db = Firebase.firestore();

  const handleChange = (event) => {
    setChannelId(event.target.value);
  };

  if (loading || error || user === null) return null;

  const [channel, channelLoading, channelError] = useCollection(
    db.collection(`users/${user.uid}/channels`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (channelLoading || channelError) return null;

  const channels = channel.docs.map((doc) => doc.data());

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Promise.all([
      db
        .collection("channels")
        .doc(channelId)
        .collection("blocks")
        .doc(path.replace(/\//gi, "-"))
        .set({
          source: sourceID,
        }),
      db
        .collection("sources")
        .doc(sourceID)
        .collection("paragraphs")
        .doc(paragraphID)
        .collection("channels")
        .add({
          channel: channelId,
        }),
      db.doc(path).update({
        channels: Firebase.firestore.FieldValue.arrayUnion(channelId),
      }),
    ]).then(function () {
      setRecentId(channelId);
    });
  };

  const displayRecent = <Link to={`/channel/${recentId}`}>{recentId}</Link>;

  return (
    user && (
      <AddToChannelContainer>
        <AddToChannelLabel>Add to Channel:</AddToChannelLabel>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Channel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={channelId}
              onChange={handleChange}
            >
              {channels.map((c) => (
                <MenuItem value={c.id}>{c.title}</MenuItem>
              ))}
            </Select>
            <Button type="submit" variant="contained" value="submit">
              Add to channel
            </Button>
            <div className="belongsTo">{displayRecent}</div>
          </FormControl>
        </form>
      </AddToChannelContainer>
    )
  );
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

export const SourceParagraph = ({
  doc,
  setFocused,
  focused,
  handleConnect,
  path,
}) => {
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
      <StyledParagraph id={doc.docid} focused={f} ref={boxRef}>
        {doc.body}
      </StyledParagraph>
      {!!f && (
        <Box>
          <Box>
            <AddToChannel
              path={`sources/${path}/body/${doc.docid}`}
              paragraphID={doc.docid}
              sourceID={path}
            />
          </Box>
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
    return <CircularProgress />;
  }

  // sort paragraphs by index
  const data = value.collection.docs
    .map((doc) => ({ ...doc.data(), docid: doc.id }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <Box>
      {DEBUG && <pre>{`focused: ${focused || "n/a"}`}</pre>}
      <h1>
        {value.document.data().title} / {value.document.data().creator}
      </h1>

      {data
        // get rid of super short paragraphs
        .filter((doc) => doc.body.length > LENGTH_THRESHOLD)
        .map((doc) => (
          <SourceParagraph
            doc={doc}
            focused={focused}
            setFocused={setFocused}
            handleConnect={handleConnect}
            path={sourceId}
          />
        ))}
    </Box>
  );
};

export default SourcePage;
