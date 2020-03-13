import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const qry = gql`
  {
    menus {
     title
     seq
  }
`;

export const BasicQuery = () => {
  console.log(qry);
  return (
    <>
      <Query query={qry}>
        {({ loading, error, data }) => {
          if (loading) return <h1>loading...</h1>;
          console.log(data);
          return (
            <Fragment>
              <ul>
                {data.menus.map((v, i) => {
                  return <li key={i}>{v.title}</li>;
                })}
              </ul>
            </Fragment>
          );
        }}
      </Query>
    </>
  );
};
