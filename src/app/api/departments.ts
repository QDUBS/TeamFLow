import { GET_ALL_DEPARTMENTS } from "../graphql/queries/getDepartments";
import graphqlClient from "../lib/grahql_client";

export const fetchDepartments = async (page: number) => {
  const data: any = await graphqlClient.request(GET_ALL_DEPARTMENTS);
  return await data.getAllDepartments;
};
