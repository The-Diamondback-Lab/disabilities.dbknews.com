import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Helmet } from 'react-helmet';

import Home from "./pages/Home";
import Article from './pages/Article';

import { tocData, authorLinks } from '../constants';
import LoadingLogo from "./components/LoadingLogo";
import BasePage from "./pages/BasePage";

export default function App() {
  // Mapping each part in table of contents to a Route object
  let articleRoutes = tocData.map((data, i) => {
    let pageProps = {
      ...data,
      pageNumber: i,
      authorLinks
    };

    if (i > 0) pageProps.prevPagePath = tocData[i-1].path;
    if (i < tocData.length - 1) pageProps.nextPagePath = tocData[i+1].path;

    let basePage = (
      <BasePage
        pageComponent={Article}
        pageProps={pageProps} />);

    return (
      <Router exact path={'/' + data.path} key={`route-part-${i+1}`}>
        <Helmet>
          <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          <script src="https://highcharts.github.io/pattern-fill/pattern-fill.js"></script>
        </Helmet>
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
