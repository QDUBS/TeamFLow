import { gql } from "graphql-request";

export const GET_ALL_DEPARTMENTS = gql`
  {
    getAllDepartments {
      id
      name
      subDepartments {
        name
      }
    }
  }
`;
