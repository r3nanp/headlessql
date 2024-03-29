import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Layout, EventCard } from '@/components'
import { client } from '@/lib/graphql'
import { GET_EVENTS } from '@/graphql/queries/home'
import { GetHome } from '@/graphql/types/GetHome'
import { motion } from 'framer-motion'
import { listVariants } from '@/constants/variants'

export default function Home({ events }: GetHome) {
  const [firstEvent, ...data] = events

  const { push } = useRouter()

  const handleGoToTheHighlight = useCallback(() => {
    push(`/events/${firstEvent.slug}`)
  }, [firstEvent.slug, push])

  return (
    <Layout title="Great memories">
      <Head>
        <title>Find the greatest memories here</title>
      </Head>

      <section
        className="m-auto mt-[-42px] flex min-h-[21.5rem] w-4/5 cursor-pointer flex-wrap-reverse justify-around rounded-[1.875rem] bg-white p-6 md:p-14"
        onClick={handleGoToTheHighlight}
      >
        <div className="max-h-80 w-[38.75rem]">
          <h2 className="mb-[0.625rem] text-2xl font-bold text-[#232323]">
            {firstEvent.title}
          </h2>
        </div>
        <div className="max-h-80 w-[35.625rem]">
          <Image
            src={firstEvent.image.url}
            alt={firstEvent.title}
            width={200}
            height={100}
            objectFit="cover"
            layout="responsive"
            className="rounded-[1.25rem] hover:opacity-90"
          />
        </div>
      </section>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="m-auto flex max-w-[80%] flex-wrap justify-center gap-16"
      >
        {data.map(event => (
          <EventCard key={`event-${event.id}`} event={event} />
        ))}
      </motion.div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { events } = await client.request<GetHome>(GET_EVENTS)

  return {
    props: {
      events
    }
  }
}
