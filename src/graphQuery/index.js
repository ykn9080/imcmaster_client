import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
const DELETE_COMPANY = gql`
  mutation($_id: ID!) {
    deleteCompany(_id: $_id) {
      ok
    }
  }
`;
const DELETE_COMPANY1 = gql`
  mutation {
    deleteCompany(_id: "5e6da1269f78bf4ec009561a") {
      ok
    }
  }
`;
const UPDATE_COMPANY = gql`
  mutation(
    $_id: ID!
    $id: String
    $name: String
    $language: String
    $module: String
  ) {
    updateCompany(
      _id: $_id
      input: { id: $id, name: $name, language: $language, module: $module }
    ) {
      _id
      id
      name
    }
  }
`;
const COMPANIES = gql`
  query {
    companies {
      _id
      name
    }
  }
`;
const COMPANY = gql`
  query($_id: ID!) {
    company(_id: $_id) {
      id
      name
      language
    }
  }
`;
const COMPANY1 = gql`
  {
    company(_id: "5dfaf2a00bef4c4c08ab006a") {
      id
      name
      language
    }
  }
`;

export const BasicQuery = () => {
  const { loading, data } = useQuery(COMPANIES);
  const { loading: loading2, data: company } = useQuery(COMPANY, {
    variables: { _id: "5dfaf2a00bef4c4c08ab006a" }
  });
  const { loading: loading3, data: data3, error: error3 } = useQuery(COMPANY1);
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
  console.log("this is data2: ", company);
  console.log("this is data3: ", data3);
  const [
    createCompany,
    { data: data1, loading: loading1, error: error1 }
  ] = useMutation(CREATE_COMPANY, {
    refetchQueries: [{ query: COMPANIES }],
    awaitRefetchQueries: true
  });
  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    refetchQueries: [{ query: COMPANIES }],
    awaitRefetchQueries: true
  });
  //const [deleteCompany] = useMutation(DELETE_COMPANY);

  const [deleteCompany] = useMutation(DELETE_COMPANY, {
    refetchQueries: [{ query: COMPANIES }],
    awaitRefetchQueries: true
  });

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
          return (
            <li key={i}>
              {v._id}
              {v.name}
              <DeleteForeverIcon
                onClick={e => {
                  deleteCompany({
                    variables: { _id: v._id }
                  });
                }}
              />
            </li>
          );
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
      <Button
        onClick={() => {
          updateCompany({
            variables: {
              _id: "5e6da1269f78bf4ec009561a",
              id: "test111",
              name: "test111",
              language: "kr",
              module: ""
            }
          });
        }}
      >
        company edit
      </Button>
    </>
  );
};
