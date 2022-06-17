import { gql } from 'graphql-request'

export const GET_EVENT_BY_SLUG = gql`
  query Events($slug: String!) {
    event(where: { slug: $slug }) {
      id
      slug
      title
      date
      description
      image {
        url
      }
      createdAt
      updatedAt
    }
  }
`
