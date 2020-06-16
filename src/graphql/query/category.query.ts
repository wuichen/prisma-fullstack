import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query categories($type: String!) {
    categories(type: $type) {
      id
      name
      slug
      icon
      children {
        id
        name
        slug
      }
    }
  }
`;