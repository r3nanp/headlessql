import { fetchMemory } from '@/graphql/queries/memory'
import { useResourceById } from '@/hooks/useResourceById'
import { Spinner } from './Spinner'

export const Memories = ({ eventId }: { eventId: string }) => {
  const { data, isFetching, isError } = useResourceById(eventId, () =>
    fetchMemory(eventId)
  )

  if (!data && isFetching) return <Spinner />

  if (isError) return <p>Puff... All the memories are gone! </p>

  return (
    <section className="">
      <h3 className="my-2 text-4xl font-bold">Memories</h3>

      {data?.map(memory => (
        <blockquote
          className="quote my-4 border-l-4 border-neutral-500 bg-neutral-100 p-4 italic text-neutral-600"
          key={memory.id}
        >
          {memory.story} - <span className="font-bold">{memory.name}</span>
        </blockquote>
      ))}
    </section>
  )
}
