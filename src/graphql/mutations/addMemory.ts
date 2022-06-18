import { gql } from 'graphql-request'

export const createMemory = gql`
  mutation CreateMemory($eventId: ID!, $name: String!, $story: String!) {
    createMemory(
      data: { name: $name, story: $story, event: { connect: { id: $eventId } } }
    ) {
      id
    }
  }
`
