import { ReactNode } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

interface LayoutProps {
  title: string
  children: ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Wrapper>{children}</Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 32px;
  margin: 0 auto;

  & > * + * {
    margin-top: 2rem;
  }
`

export default Layout
