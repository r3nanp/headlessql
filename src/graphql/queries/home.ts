import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query Events {
    events {
      id
      date
      slug
      title
      createdAt
      updatedAt
    }
  }
`
