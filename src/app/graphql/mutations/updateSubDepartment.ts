import { gql } from "@apollo/client";

export const UPDATE_SUB_DEPARTMENT = gql`
  mutation UpdateSubDepartment($id: ID!, $name: String!, $department: String!) {
    updateSubDepartment(
      id: $id
      updateSubDepartmentDto: { name: $name, department: $department }
    ) {
      id
      name
      department
    }
  }
`;
