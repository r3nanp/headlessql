import { FolderAddIcon } from '@heroicons/react/outline'

import { fetchMemory } from '@/graphql/queries/memory'
import { useResourceById } from '@/hooks/useResourceById'
import { Spinner } from './Spinner'

export const Memories = ({ eventId }: { eventId: string }) => {
  const { data, isFetching, isError } = useResourceById(eventId, () =>
    fetchMemory(eventId)
  )

  if (isFetching) return <Spinner />

  if (isError) return <p>Puff... All the memories are gone! </p>

  return (
    <section>
      <h3 className="my-2 text-4xl font-bold">Memories</h3>

      {data?.map(memory => (
        <blockquote
          className="quote my-4 border-l-4 border-neutral-500 bg-neutral-100 p-4 italic text-neutral-600"
          key={memory.id}
        >
          {memory.story} - <span className="font-bold">{memory.name}</span>
        </blockquote>
      ))}

      {data?.length === 0 && (
        <div>
          <FolderAddIcon className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No memories
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new memory in the form below.
          </p>
        </div>
      )}
    </section>
  )
}
