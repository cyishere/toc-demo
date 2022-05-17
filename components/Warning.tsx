import { ReactNode } from 'react'
import styled from 'styled-components'

interface WarningProps {
  children: ReactNode
}

const Warning: React.FunctionComponent<WarningProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  background-color: #fdf5d3;
  padding: 32px;
  margin-top: 1.4em;

  & code {
    color: ${({ theme }) => theme.colors.primary};
    background-color: #f5f5f5;
    padding: 6px 8px;
    border-radius: 6px;
  }
`

export default Warning
