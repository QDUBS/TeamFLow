import { gql } from "@apollo/client";

export const CREATE_SUB_DEPARTMENT = gql`
  mutation CreateSubDepartment($name: String!, $department: String!) {
    createSubDepartment(
      createSubDepartmentDto: { name: $name, department: $department }
    ) {
      id
      name
      department {
        name
      }
    }
  }
`;
