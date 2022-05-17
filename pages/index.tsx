import { useRef } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import { MDXComponents } from 'mdx/types'
import { NextPage } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Link from 'next/link'
import path from 'path'
import styled from 'styled-components'

import { POSTS_PATH } from '@/utils/mdxUtils'
import ArticleParagraphTitle from '@/components/ArticleParagraphTitle'
import Layout from '@/components/Layout'
import TableOfContents from '@/components/TableOfContents'
import Warning from '@/components/Warning'
import Paragraph from '@/components/Paragraph'

const components = {
  h1: ArticleParagraphTitle,
  p: Paragraph
}

interface PostPageProps {
  source: MDXRemoteSerializeResult
  frontmatter: {
    [key: string]: any
  }
}
const PostPage: NextPage<PostPageProps> = ({ source, frontmatter }) => {
  const articleRef = useRef<HTMLElement>(null)

  return (
    <Layout title='Demo for Table of Contents'>
      <Header>
        <Title>{frontmatter.title}</Title>
        <Warning>
          ⚠️ This method is getting the article block by <code>ref</code> which
          is more explicit with the <code>h1</code> headings.
        </Warning>
      </Header>
      <Main>
        <Sidebar>
          <TableOfContents articleRef={articleRef} />
        </Sidebar>
        <Article ref={articleRef}>
          <MDXRemote {...source} components={components as MDXComponents} />
        </Article>
      </Main>
    </Layout>
  )
}

export default PostPage

const Header = styled.header``

const Title = styled.h1`
  margin-bottom: 0;
`

const Main = styled.main`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;
`

const Sidebar = styled.aside`
  flex: 0 100000 250px;
  margin-left: auto;
`

const Article = styled.article`
  flex: 1 1 686px;
  max-width: min(686px, 100%);

  & > * + * {
    margin-top: 1em;
  }
`

export const getStaticProps = async () => {
  const postFilePath = path.join(POSTS_PATH, `demo-for-table-of-contents.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    },
    scope: data
  })

  return {
    props: {
      source: mdxSource,
      frontmatter: data
    }
  }
}
