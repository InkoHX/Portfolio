import { Typography } from '@material-ui/core'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import * as React from 'react'

import { Article, ArticleFooter, ArticleHeader, ArticleMain, HomeBackground } from '../../components'
import { getAllPosts, Post, TagMetadata, getAllTags } from '../../lib'

interface PostProps {
  post: SerializePost
}

export interface PostTag extends Omit<TagMetadata, 'description'> {
  fileName: string
}

interface SerializePost extends Omit<Post, 'matterFile' | 'modifiedDate' | 'createdDate' | 'tags'> {
  modifiedDate: number
  createdDate: number
  tags: PostTag[]
}

const PostPage: React.FC<PostProps> = ({
  post
}) => {
  return (
    <React.Fragment>
      <Head>
        <link rel='stylesheet' href='/style/a11y-dark.css' />
      </Head>
      <NextSeo
        description={post.description}
        title={post.title}
      />
      <HomeBackground>
        <Typography variant='h5' component='p'>{post.title} - InkoHX blog</Typography>
      </HomeBackground>
      <Article>
        <ArticleHeader
          modifiedTime={post.modifiedDate}
          title={post.title}
          tags={post.tags}
        />
        <ArticleMain dangerouslySetInnerHTML={{ __html: post.html }} />
        <ArticleFooter filePath={post.filePath} />
      </Article>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const post = await getAllPosts()
    .then(posts => posts.find(post => post.fileName === params?.id))

  if (!post) throw new Error('Post is not found.')

  const tags = await getAllTags()
    .then(tags => tags.filter(tag => post.tags.includes(tag.name)))
    .then(tags => tags.map(tag => {
      return {
        name: tag.name,
        fileName: tag.fileName
      } as PostTag
    }))

  return {
    props: {
      post: {
        createdDate: post.createdDate.valueOf(),
        modifiedDate: post.modifiedDate.valueOf(),
        description: post.description,
        fileName: post.fileName,
        filePath: post.filePath,
        html: post.html,
        title: post.title,
        tags
      }
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPosts()
    .then(posts => posts.map(post => {
      return {
        params: {
          id: post.fileName
        }
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export default PostPage