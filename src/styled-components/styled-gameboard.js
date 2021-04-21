import styled from "styled-components";

const StyledBoard = styled.div`
  /* TODO: query screen width to set cell size */
  --container-size: 20rem;
  --cell-size: ${({ size }) => `calc(var(--container-size)/${size})`};

  /* box-sizing: border-box; */
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, var(--cell-size));
  grid-template-rows: repeat(${({ size }) => size}, var(--cell-size));

  max-width: var(--container-size);

  border: 1px solid black;

  > .grid-bg {
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
  }
`;

export default StyledBoard;
