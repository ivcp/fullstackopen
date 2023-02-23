import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      author
      title
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;
