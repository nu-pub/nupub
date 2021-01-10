import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Paragraph = styled.p`
  padding: 0;
  color: ${(props) => {
    if (props.focused == null) {
      return "black";
    } else if (props.focused) {
      return "black";
    } else {
      return "gray";
    }
  }};
`;

export default Paragraph;
