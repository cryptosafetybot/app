import React from "react";
import styled from "styled-components";

/**
 * Wrapper for form sections
 */
function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return <StyledWrapper>{children}</StyledWrapper>;
}

const StyledWrapper = styled.section`
  display: grid;
  grid-auto-columns: 1fr;

  padding: 0px 8px;

  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
`;

/**
 * Section header
 */
function Header({ children }: React.PropsWithChildren<{}>) {
  return <StyledHeader>{children}</StyledHeader>;
}

const StyledHeader = styled.header`
  padding: 8px 0;

  font-weight: bold;
`;
/**
 * Section content
 */
function Content({ children }: React.PropsWithChildren<{}>) {
  return <StyledContent>{children}</StyledContent>;
}

const StyledContent = styled.div`
  padding: 8px 0;

  border-top: 1px solid ${(props) => props.theme.border};
`;

export const Section = {
  Wrapper,
  Header,
  Content,
};
