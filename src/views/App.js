import React from "react";
import Firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";
import Header from "./header";
import { Container } from "@material-ui/core";

const UserCrumbContext = React.createContext([]);

const App = () => {
  return (
    <FirestoreProvider firebase={Firebase}>
      <BrowserRouter>
        <ErrorBoundary>
          <UserCrumbContext.Provider>
            <Container>
              <Header />
              <Container fixed maxWidth="sm">
                <Routes />
              </Container>
            </Container>
          </UserCrumbContext.Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </FirestoreProvider>
  );
};

export default App;
