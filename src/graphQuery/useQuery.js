import { useQuery } from "@apollo/react-hooks";

export function QueryHandler({ QUERY, VARIABLES }) {
  return useQuery(QUERY, {
    variables: VARIABLES
  });
}
