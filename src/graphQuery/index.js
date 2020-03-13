import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import CircularProgress from "@material-ui/core/CircularProgress";

// const mutation = gql`
//   mutation createCompany(
//     $id: String
//     $name: String
//     $language: String
//     $module: String
//   ) {
//     createCompany(id: $id, name: $name, language: $language, module: $module) {
//       id
//       name
//       language
//     }
//   }
// `;
const qry = gql`
  query {
    companies {
      title
      seq
    }
  }
`;

export const BasicQuery = () => {
  const { loading, data } = useQuery(qry);
  console.log(data);
  if (loading)
    return (
      <>
        <CircularProgress />
        <h4>Loading ....</h4>
      </>
    );
  return (
    <>
      <ul>
        {data.menues.map((v, i) => {
          return <li key={i}>{v.title}</li>;
        })}
      </ul>
      {/* <Query query={qry}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <>
                <CircularProgress />
                <h4>Loading ....</h4>
              </>
            );
          return (
            <Fragment>
              <ul>
                {data.menues.map((v, i) => {
                  return <li key={i}>{v.title}</li>;
                })}
              </ul>
            </Fragment>
          );
        }}
      </Query> */}
    </>
  );
};
