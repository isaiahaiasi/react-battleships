import styled from "styled-components";

const StyledGridCell = styled.div`
  user-select: none;
  grid-column: ${(props) => props.position.x + 1};
  grid-row: ${(props) => props.position.y + 1};

  :hover {
    background: lightgrey;
  }
`;

export default StyledGridCell;
