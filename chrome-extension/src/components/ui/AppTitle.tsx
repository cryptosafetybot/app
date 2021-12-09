import appLogo from "../../assets/app-logo.png";
import styled from "styled-components";

interface AppTitleProps {
  title: string;
}

/**
 * Title UI
 */
export function AppTitle({ title }: AppTitleProps) {
  return (
    <StyledHeader>
      <StyledIcon src={appLogo} alt="" width={32} height={32} />
      <StyledTitle>{title}</StyledTitle>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 8px;

  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.fg};
`;

const StyledIcon = styled.img`
  margin: 8px 8px;
`;

const StyledTitle = styled.h1`
  margin: 8px 8px;

  font-family: Roboto, system-ui, sans-serif;
  font-size: 15px;
  font-weight: 600;

  line-height: 15px;
`;
