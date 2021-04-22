import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Article from './pages/Article';

import tocData from '../data/toc.json';
import LoadingLogo from "./components/LoadingLogo";
import BasePage from "./pages/BasePage";

export default function App() {
  // Mapping each part in table of contents to a Route object
  let articleRoutes = tocData.map((data, i) => {
    let basePage = (<BasePage
      pageComponent={Article}
      pageProps={data} />);

    return (
      <Router exact path={'/' + data.path} key={`route-part-${i+1}`}>
        {basePage}
      </Router>
    );
  });

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <BasePage pageComponent={Home} />
          </Route>
          <Route exact path="/loading">
            <LoadingLogo loading={true} />
          </Route>
          {articleRoutes}
        </Switch>
    </Router>
  );
}
