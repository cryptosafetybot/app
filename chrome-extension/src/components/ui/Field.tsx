import styled from "styled-components";

/**
 * Wrapper for form input elements
 */
export function Field({ children }: React.PropsWithChildren<{}>) {
  return <StyledField>{children}</StyledField>;
}

const StyledField = styled.span`
  padding: 0 4px;
`;
