import styled from "styled-components";

const StyledBoardContainer = styled.div`
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (min-width: 48rem) {
    width: 48em;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export default StyledBoardContainer;
