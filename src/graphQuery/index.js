import React, { Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const qry = gql`
  {
    allUser {
      id
      name
      username
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
      phone
      website
      company {
        name
        catchPhrase
        bs
      }
    }
  }
`;

export const BasicQuery = () => {
  return (
    <>
      <Query query={qry}>
        {({ loading, error, data }) => {
          if (loading) return <h1>loading...</h1>;
          console.log(data);
          return (
            <Fragment>
              <ul>
                {data.allUser.map((v, i) => {
                  return <li key={i}>{v.name}</li>;
                })}
              </ul>
            </Fragment>
          );
        }}
      </Query>
    </>
  );
};
