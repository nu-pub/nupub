import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const SourceSearchCardContainer = styled(Box)`
  font-family: "Quicksand", sans-serif;
  /* font-size: 2em; */
  text-decoration: false;
  color: black;
  border: 1px solid #efefef;
  border-radius: 3px;
`;

const SourceSearchCard = ({ title, creator, sourceId }) => (
  <SourceSearchCardContainer my={3} px={2}>
    <section>
      <Link
        to={`/source/${sourceId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3>{title}</h3>
      </Link>
      <pre>Creator: {creator}</pre>
    </section>
  </SourceSearchCardContainer>
);

export default SourceSearchCard;
