import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const SourceSearchCardContainer = styled(Box)``;

const SourceSearchCard = ({ title, creator, sourceId }) => (
  <SourceSearchCardContainer>
    <section>
      <Link to={`/source/${sourceId}`}>
        <h3>{title}</h3>
      </Link>
      <pre>Creator: {creator}</pre>
    </section>
  </SourceSearchCardContainer>
);

export default SourceSearchCard;
