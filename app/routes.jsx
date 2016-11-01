import React from 'react';
import {Route} from 'react-router';

import IndexPage from 'components/IndexPage';


export default function getRoutes() {
  return (
    <Route path="/" component={IndexPage} />
  );
}
