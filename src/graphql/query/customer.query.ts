import gql from 'graphql-tag';

export const GET_LOGGED_IN_CUSTOMER = gql`
  query getUser {
    me {
      id
      username
      email
      addresses {
        id
        type
        name
        info
      }
      contacts {
        id
        type
        number
      }
      cards {
        id
        type
        cardType
        name
        lastFourDigit
      }
    }
  }
`;
