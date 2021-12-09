import styled from "styled-components";

/**
 * Wrapper for field labels
 */
export function Label({ children }: React.PropsWithChildren<{}>) {
  return <StyledLabel>{children}</StyledLabel>;
}

const StyledLabel = styled.span`
  padding: 0 4px;
`;
