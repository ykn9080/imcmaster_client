import React, { Fragment, useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const CREATE_COMPANY = gql`
  mutation($id: String, $name: String, $language: String, $module: String) {
    createCompany(
      input: { id: $id, name: $name, language: $language, module: $module }
    ) {
      name
      language
    }
  }
`;
const qry = gql`
  query {
    companies {
      name
    }
  }
`;

export const BasicQuery = () => {
  const { loading, data } = useQuery(qry);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [module, setModule] = useState("");
  const setHandler = e => {
    switch (e.target.name) {
      case "id":
        setId(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "language":
        setLanguage(e.target.value);
        break;
      case "module":
        setModule(e.target.value);
        break;
    }
  };

  const [createCompany, { data1, loading1, error1 }] = useMutation(
    CREATE_COMPANY,
    {
      refetchQueries: [{ query: qry }],
      awaitRefetchQueries: true
    }
  );

  if (loading | loading1)
    return (
      <>
        <CircularProgress />
        <h4>Loading ....</h4>
      </>
    );
  return (
    <>
      <ul>
        {data.companies.map((v, i) => {
          return <li key={i}>{v.name}</li>;
        })}
      </ul>

      <input name="id" placeholder="id" onChange={setHandler} />
      <input name="name" placeholder="name" onChange={setHandler} />
      <input name="language" placeholder="language" onChange={setHandler} />
      <input name="module" placeholder="module" onChange={setHandler} />
      <Button
        onClick={() => {
          createCompany({
            variables: { id, name, language, module }
          });
        }}
      >
        company input
      </Button>
    </>
  );
};
