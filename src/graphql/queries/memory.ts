import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'
import { GetMemory } from '../types/GetMemory'

export const GET_MEMORY = gql`
  query Memories($eventId: ID!) {
    memories(where: { event: { id: $eventId } }) {
      id
      name
      story
    }
  }
`

export const fetchMemory = async (eventId: string) => {
  const { memories } = await client.request<GetMemory, { eventId: string }>(
    GET_MEMORY,
    { eventId }
  )

  return memories
}
