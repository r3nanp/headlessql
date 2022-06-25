import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import format from 'date-fns/format'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import { Layout, Memories, NewMemory } from '@/components'
import { client } from '@/lib/graphql'
import { GET_EVENT_BY_SLUG } from '@/graphql/queries/event'
import {
  EventBySlugRequest,
  EventBySlugVariables
} from '@/graphql/types/GetEventBySlug'
import { Event } from '@/types/Event'
import { motion } from 'framer-motion'
import { opacity } from '@/constants/variants'

type Memory = Event & {
  description: { compiledSource: string }
}

export default function EventPage({ event }: { event: Memory }) {
  return (
    <Layout title={event.title}>
      <Head>
        <title>{`${event.title} | Great Memories`}</title>
        <meta name="description" content={event.title} />
      </Head>

      <motion.div
        initial="initial"
        variants={opacity}
        animate="exit"
        transition={{
          duration: 1
        }}
        className="m-auto min-h-[21.5rem] p-14 md:w-4/5 lg:w-4/5"
      >
        <div className="m-auto flex w-full max-w-4xl items-center justify-center">
          <Image
            objectFit="cover"
            src={event.image.url}
            alt={event.title}
            width={750}
            height={400}
            className="w-full rounded-[1.875rem] object-cover"
          />
        </div>

        <div className="mt-5 whitespace-pre-wrap">
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <h2 className="text-2xl font-bold">{event.date}</h2>
        </div>

        <div className="md:prose-md prose my-4 lg:prose-lg lg:!max-w-none">
          <MDXRemote {...event.description} />
        </div>

        <Memories eventId={event.id} />

        <NewMemory eventId={event.id} />
      </motion.div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  const { event } = await client.request<
    EventBySlugRequest,
    EventBySlugVariables
  >(GET_EVENT_BY_SLUG, { slug })

  if (!event) {
    return {
      notFound: true
    }
  }

  const description = await serialize(event.description)

  const date = format(new Date(event.date), 'dd/MM/yyyy')

  const props = {
    event: {
      ...event,
      description,
      date
    }
  }

  return {
    props,
    revalidate: 60 * 60 * 60 // 2.5 days
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
