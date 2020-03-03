import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import allReducer from "./reducers";
import { Provider } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

import ApolloClient from "apollo-boost";
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
//import { setContext } from "apollo-link-context";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    <LoadingIndicator />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
