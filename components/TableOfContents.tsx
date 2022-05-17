import { RefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import Anchor from './Anchor'

export interface HeadingType {
  text: string
  anchor: string
}

export interface TocWithRefProps {
  articleRef: RefObject<HTMLElement>
}

export default function TocWithRef({ articleRef }: TocWithRefProps) {
  const [headings, setHeadings] = useState<HeadingType[]>([])
  const tocLinksRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const obsvCallback: IntersectionObserverCallback = ([entry]) => {
      const activeHeading = entry.target
      const links = tocLinksRef.current

      links?.forEach((link) => {
        const href = link?.href.split('#')[1]

        if (entry.isIntersecting && href === activeHeading.id) {
          links.forEach((link) => link?.classList.remove('active'))
          link?.classList.add('active')
        }
      })
    }

    const observer = new IntersectionObserver(obsvCallback, {
      threshold: [1.0]
    })

    const headingOnes: Element[] = Array.from(
      articleRef?.current?.children || []
    ).filter((el) => el.tagName.toLowerCase() === 'h1')
    const headings: HeadingType[] = headingOnes.map((h1) => {
      const id = h1?.innerHTML
        .replace(/[\W_]+/g, ' ')
        .toLowerCase()
        .replace(/ /g, '-')
      h1.id = id

      observer.observe(h1)

      return {
        text: h1.innerHTML,
        anchor: '#' + id
      }
    })
    setHeadings(headings)

    return () => {
      headingOnes.map((h1) => {
        observer.unobserve(h1)
      })
    }
  }, [articleRef])

  return (
    <Wrapper>
      <Title>Table of Contents</Title>
      {headings.length > 0 ? (
        <List>
          {headings.map((heading, i) => (
            <ListItem key={i}>
              <ItemAnchor
                href={heading.anchor}
                ref={(el: HTMLAnchorElement) => tocLinksRef.current.push(el)}
              >
                {heading.text}
              </ItemAnchor>
            </ListItem>
          ))}
        </List>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  max-height: 350px;
  margin-bottom: 32px;
  overflow-y: auto;
  position: sticky;
  top: 148px;
  z-index: 9999;

  &::-webkit-scrollbar {
    background-color: #f9f9f9;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 5px;
    width: 5px;
  }
`

const Title = styled.h2`
  display: none;
`

const List = styled.ol`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`

const ItemAnchor = styled(Anchor)`
  display: inline-block;
  padding: 4px 16px;
  border-left: 2px solid transparent;
  transition: color 300ms, border 300ms;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
  }
`
