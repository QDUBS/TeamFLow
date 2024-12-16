import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $name: String!, $subDepartments: [SubDepartmentInput!]) {
    updateDepartment(id: $id, updateDepartmentDto: { name: $name, subDepartments: $subDepartments }) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;
