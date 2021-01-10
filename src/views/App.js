import React from "react";
import Firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";
import Header from "./header";
import { Box, Container } from "@material-ui/core";

const App = () => {
  return (
    <FirestoreProvider firebase={Firebase}>
      <BrowserRouter>
        <ErrorBoundary>
          <Container>
            <Header />
            <Container fixed maxWidth="sm">
              <Routes />
            </Container>
          </Container>
        </ErrorBoundary>
      </BrowserRouter>
    </FirestoreProvider>
  );
};

export default App;
