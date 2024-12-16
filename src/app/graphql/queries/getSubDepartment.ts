import { gql } from "@apollo/client";

export const GET_SUB_DEPARTMENT = gql`
  query GetSubDepartment($id: ID!) {
    subDepartment(id: $id) {
      id
      name
      department
    }
  }
`;
