import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(createUserDto: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginDto: { username: $username, password: $password }) {
      token
    }
  }
`;
