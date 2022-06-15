import { GET_EVENTS } from '@/graphql/queries/home'
import { client } from '@/lib/graphql'
import { Event } from '@/types/Event'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

type HomeProps = {
  events: Event[]
}

export default function Home({ events }: HomeProps) {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800">
        Great memories <span className="text-red-400">or not</span>...
      </h1>

      <ul className="px-4">
        {events.map(event => (
          <li key={event.slug}>
            <Link href={`/events/${event.slug}`}>
              <a>{event.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { events } = await client.request<{ events: Event[] }>(GET_EVENTS)

  return {
    props: {
      events
    }
  }
}
