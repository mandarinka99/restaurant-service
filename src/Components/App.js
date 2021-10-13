import { Container, CircularProgress } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./HomePage/HomePage"));
const CreateQrCode = lazy(() => import("./CreateQrCode/CreateQrCode"));
const TableNumber = lazy(() => import("./TableNumber/TableNumber"));

const App = () => {
  return (
    <Container>
      <Suspense fallback={<CircularProgress />}>
        <Switch>
          <Route path="/qr" exact>
            <CreateQrCode />
          </Route>
          <Route path="/table/:number" exact>
            <TableNumber />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;
