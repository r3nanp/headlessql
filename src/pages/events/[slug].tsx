import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from '@/components'
import { client } from '@/lib/graphql'
import { GET_EVENT_BY_SLUG } from '@/graphql/queries/event'
import {
  EventBySlugRequest,
  EventBySlugVariables
} from '@/graphql/types/GetEventBySlug'

export default function Memories({ event }: EventBySlugRequest) {
  if (!event) return <div>haha</div>

  return (
    <Layout title={event.title}>
      <div className="flex items-center">{event.title}</div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  const { event } = await client.request<
    EventBySlugRequest,
    EventBySlugVariables
  >(GET_EVENT_BY_SLUG, { slug })

  return {
    props: {
      event
    },
    revalidate: 60 * 60 * 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
