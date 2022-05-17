import styled from 'styled-components'

export interface AnchorProps {
  hover?: boolean
}

const Anchor = styled.a<AnchorProps>`
  color: ${({ theme, hover }) =>
    !!hover ? theme.colors.primary : theme.colors.text};

  text-decoration: none;
  &:visited {
    color: ${({ theme, hover }) =>
      !!hover ? theme.colors.primary : 'inherit'};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`

export default Anchor
