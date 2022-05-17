import Link from 'next/link'
import styled from 'styled-components'

interface CustomLinkProps {
  as?: string
  href: string
  children: string
}

const CustomLink = ({ as, href, ...otherProps }: CustomLinkProps) => {
  return (
    <Link as={as} href={href}>
      <Anchor {...otherProps} />
    </Link>
  )
}

const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`

export default CustomLink
