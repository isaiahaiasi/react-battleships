import styled from "styled-components";

const StyledGridContent = styled.div`
  grid-column: ${({ pos }) => pos.x + 1};
  grid-row: ${({ pos }) => pos.y + 1};
`;

export default StyledGridContent;
