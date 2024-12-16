import { IDepartment } from "@/app/interfaces/IDepartment";
import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_BASE_URL}`);

const CREATE_DEPARTMENT = `
  mutation ($name: String!, $description: String!) {
    createDepartment(input: {name: $name, description: $description}) {
      id
      name
      subDepartments
    }
  }
`;

export const createDepartment = async (departmentData: IDepartment) => {
  const data: IDepartment = await graphQLClient.request(CREATE_DEPARTMENT, departmentData);
  return data;
};
