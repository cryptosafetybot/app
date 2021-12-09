import styled from "styled-components";

/**
 * Wrapper for form rows
 * Uses `label` for a11y reasons
 */
export function Row({ children }: React.PropsWithChildren<{}>) {
  return <StyledRow>{children}</StyledRow>;
}

const StyledRow = styled.label`
  display: grid;
  grid-template-columns: 70% 1fr;

  min-height: 32px;
  padding: 4px 0;

  > :nth-child(n) {
    display: flex;
    align-items: center;
  }

  > :nth-child(3n-2) {
    justify-content: flex-start;
  }

  > :nth-child(3n-1) {
    justify-content: flex-end;
  }

  > :nth-child(3n) {
    grid-column: 1 / span 2;
    justify-content: flex-start;
  }
`;
