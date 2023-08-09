import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material/styles";

import history from "providers/history";
import { store, persistor } from "providers/store";
import MainContainer from "components/MainContainer";
import bytMisTheme from "theme";
import MainRoute from "router";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <ThemeProvider theme={bytMisTheme}>
            <Router history={history}>
              <MainContainer>
                <MainRoute />
              </MainContainer>
            </Router>
          </ThemeProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
