import Firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";
import Header from "./header";

const App = () => {
  return (
    <FirestoreProvider firebase={Firebase}>
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <div className="container">
            <Routes />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </FirestoreProvider>
  );
};

export default App;
