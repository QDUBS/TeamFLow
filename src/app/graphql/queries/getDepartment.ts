import { gql } from "@apollo/client";

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;
